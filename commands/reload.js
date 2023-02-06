const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
		.setName("reload")
		.setDescription("Reload module")
    .addStringOption(option =>
  		option.setName("module")
  			.setDescription("The module to be reloaded")
  			.setRequired(true)),
  async execute(client, interaction) {
    const moduleName = interaction.options.getString("module");
  
    if (moduleName == "config")
      reloadConfig(client);
    else if (client.commands.has(moduleName))
      reloadCommand(client, moduleName);
    else if (client.buttons.has(moduleName))
      reloadButton(client, moduleName);
    else if (client.messageCommands.has(moduleName))
      reloadMessageCommand(client, moduleName);
    else
      return await interaction.reply({
        content: "Module does not exist.",
        ephemeral: true
      });
  
    await interaction.reply({
        content: `The module ${moduleName} has been reloaded`,
        ephemeral: true
      });
  }
}

function reloadConfig(client) {
  delete require.cache[require.resolve(`../config.js`)];
  const config = require(`../config.js`);
  client.config = config;
}

function reloadCommand(client, commandName) {
  delete require.cache[require.resolve(`./${commandName}.js`)];
  client.commands.delete(commandName);
  const props = require(`./${commandName}.js`);
  client.commands.set(commandName, props);
}

function reloadButton(client, buttonName) {
  delete require.cache[require.resolve(`../buttons/${buttonName}.js`)];
  client.buttons.delete(buttonName);
  const props = require(`../buttons/${buttonName}.js`);
  client.buttons.set(buttonName, props);
}

function reloadMessageCommand(client, messageCommandName) {
  delete require.cache[require.resolve(`../messageCommands/${messageCommandName}.js`)];
  client.messageCommands.delete(messageCommandName);
  const props = require(`../messageCommands/${messageCommandName}.js`);
  client.messageCommands.set(messageCommandName, props);
}