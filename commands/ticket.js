const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ticket')
		.setDescription('Displays the ticket help message'),
	async execute(client, interaction) {
		const embed = new MessageEmbed()
			.setTitle('Ticket Help')
			.setDescription(
				`If you need help from the support team, open a ticket at <#${client.config.playersupport}>.`,
			);

		await interaction.reply({ embeds: [embed] });
	},
};
