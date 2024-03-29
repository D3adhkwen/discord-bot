module.exports = (client, message) => {
	// Ignore all bots
	if (message.author.bot) {
		return;
	}

	// Ignore messages not starting with the prefix (in config.js)
	if (message.content.indexOf(client.config.prefix) !== 0) {
		return;
	}

	// Our standard argument/command name definition.
	const args = message.content
		.slice(client.config.prefix.length)
		.trim()
		.split(/ +/g);
	const command = args.shift()
		.toLowerCase();

	// Grab the command data from the client.messageCommands Enmap
	const cmd = client.messageCommands.get(command);

	// If that command doesn't exist, silently exit and do nothing
	if (!cmd) {
		return;
	}

	// Run the command
	cmd.execute(client, message, args);
};
