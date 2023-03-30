const { SlashCommandBuilder } = require("@discordjs/builders");
const fs = require("fs");

module.exports = {
  data: new SlashCommandBuilder()
		.setName("checkalt")
		.setDescription("Check whether player is an allowed alternate account")
    .addStringOption(option =>
      option.setName("ign")
        .setDescription("IGN")
        .setRequired(true)),
  async execute(client, interaction) {
    var ign = interaction.options.getString("ign");

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

    let list = "";
    for (element in alts) {
      if (element.toLowerCase() == ign.toLowerCase()) {
        // found ign as alt
        ign = element;
        return await interaction.reply({
          content: `The player \`${ign}\` is an allowed alternate account of \`${alts[element]}\`.`
        });
      } else if (alts[element].toLowerCase() == ign.toLowerCase()) {
        // found ign as main
          ign = alts[element];
        if (list == "") {
          list = list.concat(`\`${element}\``);
        } else {
          list = list.concat(", " + `\`${element}\``);
        }
      }
    }

    if (list != "") {
      return await interaction.reply({
        content: `The player \`${ign}\` is the main account of ${list}.`
      });
    } else {
      return await interaction.reply({
        content: `The player \`${ign}\` is not added as an allowed alternate account of any main account.`
      });
    }
  }
}