const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ip')
		.setDescription('Displays the server IP'),
	async execute(client, interaction) {
		const embed = new MessageEmbed()
			.setTitle('Minecraft Server IP')
			.setDescription('play.kchscraft.net');

		await interaction.reply({ embeds: [embed] });
	},
};
