const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const utils = require("../utils.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("sell")
    .setDescription("Create a sell offer")
    .addStringOption((option) =>
      option.setName("ign").setDescription("In-game Name").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("gamemode")
        .setDescription("Gamemode")
        .setRequired(true)
        .addChoice("Survival", "Survival")
        .addChoice("Skyblock", "Skyblock")
    )
    .addStringOption((option) =>
      option.setName("item").setDescription("Item to sell").setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("quantity").setDescription("Quantity").setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("price").setDescription("Price").setRequired(true)
    ),
  async execute(client, interaction) {
    const cooldown = client.marketplaceCooldown.get(interaction.user.id);
    if (cooldown) {
      const remaining = utils.formatCooldown(cooldown);

      return await interaction.reply({
        content: `You have to wait ${remaining} before you can use this command again.`,
        ephemeral: true,
      });
    } else {
      client.marketplaceCooldown.set(
        interaction.user.id,
        Date.now() + client.config.cooldown * 1000
      );
      setTimeout(() => {
        client.marketplaceCooldown.delete(interaction.user.id);
      }, client.config.cooldown * 1000);
    }

    const ign = interaction.options.getString("ign");
    const gamemode = interaction.options.getString("gamemode");
    const item = interaction.options.getString("item");
    const quantity = interaction.options.getString("quantity");
    const price = interaction.options.getString("price");

    const channel = client.channels.cache.get(client.config.marketplace);
    const embed = new MessageEmbed()
      .setColor("GREEN")
      .setTitle("Selling")
      .addFields(
        { name: "In-game Name", value: ign },
        { name: "Gamemode", value: gamemode },
        { name: "Item", value: item, inline: true },
        { name: "Quantity", value: quantity, inline: true },
        { name: "Price", value: price }
      )
      .setAuthor({
        name: interaction.member.displayName,
        iconURL: interaction.member.displayAvatarURL(),
      })
      .setTimestamp();

    channel.send({ embeds: [embed] });

    await interaction.reply({
      content: `Your sell offer has been published in <#${client.config.marketplace}>.`,
      ephemeral: true,
    });
  },
};
