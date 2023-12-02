module.exports = (client, interaction) => {
  // Ignore all bots
  if (interaction.user.bot) return;

  let module;

  if (interaction.isButton()) module = client.buttons.get(interaction.customId);
  else if (interaction.isCommand())
    module = client.commands.get(interaction.commandName);

  // If that module doesn't exist, silently exit and do nothing
  if (!module) return;

  // Run the command
  module.execute(client, interaction);
};
