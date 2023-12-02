// Run this .js file by typing "node deploy-cmds.js" in Shell.
// For Pterodactyl panel, change "MAIN FILE" to deploy-cmds.js in Startup tab
// Required to be run everytime there"s changes in data of each command

const { REST, Routes } = require('discord.js');
const fs = require('fs');
require('dotenv')
	.config();

const commands = [];
const commandFiles = fs
	.readdirSync('./commands')
	.filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST()
	.setToken(process.env.DISCORD_TOKEN);

(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationGuildCommands(
				process.env.CLIENT_ID,
				process.env.GUILD_ID),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();

// delete slash command from server
// rest.delete(Routes.applicationGuildCommand(process.env.CLIENT_ID, process.env.GUILD_ID, 'command_id'))
// 	.then(() => console.log('Successfully deleted guild command'))
// 	.catch(console.error);
