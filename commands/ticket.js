const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ticket')
		.setDescription('Displays the ticket help message'),
	async execute(client, interaction) {
		const embed = new EmbedBuilder()
			.setTitle('Ticket Help')
			.setDescription(
				`If you need help from the support team, open a ticket at <#${client.config.playersupport}>.`,
			);

		await interaction.reply({ embeds: [embed] });
	},
};
