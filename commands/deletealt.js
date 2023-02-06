const { SlashCommandBuilder } = require("@discordjs/builders");
const fs = require("fs");

module.exports = {
  data: new SlashCommandBuilder()
		.setName("deletealt")
		.setDescription("Delete player as an allowed alternate account")
    .addStringOption(option =>
  		option.setName("ign")
  			.setDescription("IGN")
  			.setRequired(true)),
  async execute(client, interaction) {
    const ign = interaction.options.getString("ign");

    if (!fs.existsSync("./alts.json")) {
      fs.openSync('./alts.json', 'w');
    }
    let content = fs.readFileSync("./alts.json", "utf8");
    var alts;
    if (content) {
      alts = JSON.parse(content);
    } else {
      return await interaction.reply({
        content: "There are no allowed alternate account added yet.",
        ephemeral: true
      });
    }

    if (!alts[ign]) {
      // not added as alt
      return await interaction.reply({
        content: `The player \`${ign}\` is not an allowed alternate account.`,
        ephemeral: true
      });
    } else {
      delete alts[ign];
    }

    fs.writeFile("./alts.json", JSON.stringify(alts), (err) => {
      if (err) console.error(err);
    });
  
    await interaction.reply({
        content: `The player \`${ign}\` is removed as an allowed alternate account.`
    });
  }
}