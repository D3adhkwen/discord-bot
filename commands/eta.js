const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
		.setName("eta")
		.setDescription("Displays the ETA"),
  async execute(client, interaction) {
    const embed = new MessageEmbed()
      .setTitle("NO ETA")
      .setDescription("There is no estimated time for it, please wait patiently.")
  
    await interaction.reply({ embeds: [embed] });
  }
}