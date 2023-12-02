const { EmbedBuilder, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Colors } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('voteappeal')
		.setDescription('Generates vote appeal message')
		.addUserOption((option) =>
			option.setName('user')
				.setDescription('The user to be mentioned')
				.setRequired(true),
		)
		.addIntegerOption((option) =>
			option.setName('votes')
				.setDescription('Number of votes')
				.setRequired(true),
		)
		.addIntegerOption((option) =>
			option.setName('days')
				.setDescription('Number of days')
				.setRequired(true),
		),
	async execute(client, interaction) {
		const user = interaction.options.getUser('user');
		const votes = interaction.options.getInteger('votes');
		const days = interaction.options.getInteger('days');
		const endDate = new Date();
		endDate.setDate(endDate.getDate() + days);
		const endDateEpoch = (endDate.getTime() / 1000).toFixed(0);

		const embed = new EmbedBuilder()
			.setTitle('Vote Appeal')
			.setDescription(`Hello ${user}, the staff team has decided to provide you with a chance to get unbanned through a vote appeal.\n
      You are required to vote ${votes} times within ${days} days.\n
      The vote appeal will end on <t:${endDateEpoch}:D>.\n
      If you reach the required votes before the end date, you can open a ticket again for early unban.\n
      All vote links are available at <#731154097599676446>`);

		const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('accept')
					.setLabel('Accept')
					.setStyle(ButtonStyle.Success),
				new ButtonBuilder()
					.setCustomId('deny')
					.setLabel('Reject')
					.setStyle(ButtonStyle.Danger),
			);

		const response = await interaction.channel.send({
			embeds: [embed],
			components: [row],
		});

		const filter = (i) => i.user.id === user.id;

		const collector = interaction.channel.createMessageComponentCollector({
			filter,
			time: 2147483647,
		});

		collector.on('collect', async (i) => {
			// anti
			if (i.user.id != user.id) {
				const errorEmbed = new EmbedBuilder()
					.setColor(Colors.Red)
					.setTitle('This is not your appeal form');
				i.channel.send({ embeds: [errorEmbed], ephemeral: true });
				return;
			}
			switch (i.customId) {
			case 'accept': {
				response.delete();
				const acceptEmbed = new EmbedBuilder()
					.setColor(Colors.Green)
					.setTitle('Vote Appeal Accepted')
					.setDescription(
						'Great, remember to vote ' +
                votes +
                ' times in <t:' +
                endDateEpoch +
                ':D> to get unban. Once you think you reached the vote count, create a ticket for ban appeal!',
					);
				i.channel.send({ embeds: [acceptEmbed] });
				break;
			}
			case 'deny': {
				response.delete();
				const rejectEmbed = new EmbedBuilder()
					.setColor(Colors.Red)
					.setTitle('Vote Appeal Rejected')
					.setDescription(
						'This is the only way to get you unban, seems you rejected the vote appeal. So if nothing else, please close the ticket.',
					);
				i.channel.send({ embeds: [rejectEmbed] });
				break;
			}
			}
			collector.stop();
		});
		client.voteAppealCollection.set(interaction, collector);

		collector.on('end', (collected) => {
			console.log(`Vote Appeal Collector: Clicked ${collected.size} items.`);
		});
		await interaction.reply({
			content: 'The vote appeal has been generated',
			ephemeral: true,
		});
	},
};
