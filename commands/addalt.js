const { SlashCommandBuilder } = require("@discordjs/builders");
const fs = require("fs");

module.exports = {
  data: new SlashCommandBuilder()
		.setName("addalt")
		.setDescription("Add player as allowed alternate account")
    .addStringOption(option =>
      option.setName("alt")
        .setDescription("Alternate account IGN")
        .setRequired(true))
    .addStringOption(option =>
  		option.setName("main")
  			.setDescription("Main account IGN")
  			.setRequired(true)),
  async execute(client, interaction) {
    const altIgn = interaction.options.getString("alt");
    const mainIgn = interaction.options.getString("main");

    if (!fs.existsSync("./alts.json")) {
      fs.openSync('./alts.json', 'w');
    }
    let content = fs.readFileSync("./alts.json", "utf8");
    var alts;
    if (content) {
      alts = JSON.parse(content);
    } else {
      alts = JSON.parse("{}");
    }

    if (alts[altIgn]) {
      // already added as alt
      return await interaction.reply({
        content: `The player \`${altIgn}\` is already an allowed alternate account of \`${alts[altIgn]}\`.`,
        ephemeral: true
      });
    } else {
      // no existing alt, add new data
      alts[altIgn] = mainIgn;
    }

    fs.writeFile("./alts.json", JSON.stringify(alts), (err) => {
      if (err) console.error(err);
    });
  
    await interaction.reply({
        content: `The player \`${altIgn}\` is added as an allowed alternate account of \`${alts[altIgn]}\`.`
    });
  }
}