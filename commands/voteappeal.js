const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
		.setName("voteappeal")
		.setDescription("Generates vote appeal message")
    .addUserOption(option =>
      option.setName("user")
        .setDescription("The user to be mentioned")
        .setRequired(true))
    .addIntegerOption(option =>
  		option.setName("votes")
  			.setDescription("Number of votes")
  			.setRequired(true))
    .addIntegerOption(option =>
  		option.setName("days")
  			.setDescription("Number of days")
  			.setRequired(true)),
  async execute(client, interaction) {
    const user = interaction.options.getUser("user");
    const votes = interaction.options.getInteger("votes");
    const days = interaction.options.getInteger("days");
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + days);
    const endDateEpoch = (endDate.getTime() / 1000).toFixed(0);

    const embed = new MessageEmbed()
      .setTitle("Vote Appeal")
      .setDescription(`Hello ${user}, the staff team has decided to provide you with a chance to get unbanned through a vote appeal.\n
      You are required to vote ${votes} times within ${days} days.\n
      The vote appeal will end on <t:${endDateEpoch}:D>.\n
      If you reach the required votes before the end date, you can open a ticket again for early unban.\n
      All vote links are available at <#731154097599676446>`)
  
    interaction.channel.send({content:`<@${user.id}>`, embeds: [embed] })
    await interaction.reply({
        content: `The vote appeal has been generated`,
        ephemeral: true
    });
  }
}