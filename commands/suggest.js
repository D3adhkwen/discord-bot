const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const utils = require("../utils.js");

module.exports = {
  data: new SlashCommandBuilder()
		.setName("suggest")
		.setDescription("Provide a suggestion")
    .addStringOption(option =>
  		option.setName("gamemode")
  			.setDescription("Gamemode")
  			.setRequired(true)
        .addChoice("Survival", "Survival")
        .addChoice("Skyblock", "Skyblock")
        .addChoice("RPG", "RPG")
        .addChoice("Kit-PvP", "Kit-PvP")
        .addChoice("Duels", "Duels")
        .addChoice("Events", "Events"))
    .addStringOption(option =>
      option.setName("suggestion")
        .setDescription("Describe the suggestion")
        .setRequired(true)),
  async execute(client, interaction) {
    const cooldown = client.suggestCooldown.get(interaction.user.id);
    if (cooldown) {
      const remaining = utils.formatCooldown(cooldown);
      
      return await interaction.reply({
        content: `You have to wait ${remaining} before you can use this command again.`,
        ephemeral: true
      });
    } else {
      client.suggestCooldown.set(interaction.user.id, Date.now() + (client.config.cooldown * 1000));
      setTimeout(() => {
        client.suggestCooldown.delete(interaction.user.id);
      }, client.config.cooldown * 1000);
    }
    
    var channelId;
    const gamemode = interaction.options.getString("gamemode");

    switch(gamemode) {
      case "Survival":
        channelId = client.config.survivalsuggestion;
        break;
      case "Skyblock":
        channelId = client.config.skyblocksuggestion;
        break;
      case "RPG":
        channelId = client.config.rpgsuggestion;
        break;
      case "Kit-PvP":
        channelId = client.config.kitpvpsuggestion;
        break;
      case "Duels":
        channelId = client.config.duelssuggestion;
        break;
      case "Events":
        channelId = client.config.eventssuggestion;
        break;
    }

    const suggestion = interaction.options.getString("suggestion");
    const channel = client.channels.cache.get(channelId);
    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setDescription(suggestion)
      .setAuthor({
        name: interaction.member.displayName,
        iconURL: interaction.member.displayAvatarURL()
      })
      .setTimestamp()

    channel.send({ embeds: [embed] })
      .then(message => {
        const stonks = message.guild.emojis.cache.find(emoji => emoji.name === "stonks");
        const stinks = message.guild.emojis.cache.find(emoji => emoji.name === "stinks");
        message.react(stonks);
        message.react("🤦");
        message.react(stinks);
      });
  
    await interaction.reply({
        content: `Your suggestion has been published in <#${channelId}>.`,
        ephemeral: true
    });
  }
}