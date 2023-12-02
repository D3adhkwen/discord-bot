module.exports = (client, interaction) => {
	// Ignore all bots
	if (interaction.user.bot) {
		return;
	}

	let module;

	if (interaction.isButton()) {
		module = client.buttons.get(interaction.customId);
	} else if (interaction.isCommand()) {
		module = client.commands.get(interaction.commandName);
	} else if (interaction.isStringSelectMenu()) {
		module = client.stringSelects.get(interaction.customId);
	} else if (interaction.isModalSubmit()) {
		module = client.modals.get(getModalId(interaction.customId));
	}

	// If that module doesn't exist, something's wrong
	if (!module) {
		console.log(`Module doesn't exist. user = ${interaction.user}, customId = ${interaction.customId}`);
		return;
	}

	// Run the command
	module.execute(client, interaction);
};

/**
 * Required because Discord doesn't provide a way to pass around data in modals
 */
function getModalId(customId) {
	if (customId.includes('suggestion')) {
		return customId.split('-')[0];
	} else {
		return customId;
	}
}
