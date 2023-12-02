const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ip')
		.setDescription('Displays the server IP'),
	async execute(client, interaction) {
		const embed = new EmbedBuilder()
			.setTitle('Minecraft Server IP')
			.setDescription('play.kchscraft.net');

		await interaction.reply({ embeds: [embed] });
	},
};
