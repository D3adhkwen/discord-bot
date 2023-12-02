const { EmbedBuilder, Colors } = require('discord.js');

module.exports = {
	async execute(client, interaction) {
		const suggestion = interaction.fields.getTextInputValue('suggestion');
		const channelId = interaction.customId.split('-')[1];
		const channel = client.channels.cache.get(channelId);

		const embed = new EmbedBuilder()
			.setColor(Colors.Default)
			.setDescription(suggestion)
			.setAuthor({
				name: interaction.member.displayName,
				iconURL: interaction.member.displayAvatarURL(),
			})
			.setTimestamp();

		channel.send({ embeds: [embed] })
			.then((message) => {
				const stonks = message.guild.emojis.cache.find(
					(emoji) => emoji.name === 'stonks',
				);
				const stinks = message.guild.emojis.cache.find(
					(emoji) => emoji.name === 'stinks',
				);
				message.react(stonks);
				message.react('🤦');
				message.react(stinks);
			});

		await interaction.reply({
			content: `Your suggestion has been published in <#${channelId}>.`,
			ephemeral: true,
		});
	},
};
