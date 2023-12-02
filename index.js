const { Client, Collection, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const config = require('./config.js');
require('dotenv')
	.config();

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildPresences,
	],
});

client.config = config;
client.buttons = new Collection();
client.commands = new Collection();
client.messageCommands = new Collection();
client.stringSelects = new Collection();
client.modals = new Collection();
client.suggestCooldown = new Collection();
client.marketplaceCooldown = new Collection();
client.voteAppealCollection = new Collection();
// Debug
if (config.debug) {
	client.on('debug', (e) => console.info(e));
}

// Register events
registerEvent();

// Register interactions
registerInteraction('buttons', client.buttons);
registerInteraction('commands', client.commands);
registerInteraction('messageCommands', client.messageCommands);
registerInteraction('stringSelects', client.stringSelects);
registerInteraction('modals', client.modals);

client.login(process.env.DISCORD_TOKEN);

function registerEvent() {
	const folderName = 'events';
	createDirectory(folderName);
	const files = readFiles(folderName);
	// Save interaction into client
	for (const file of files) {
		const eventName = file.split('.')[0];
		const event = require(`./${folderName}/${file}`);

		client.on(eventName, event.bind(null, client));
		console.log(`Binded event ${eventName}`);
	}
}

function registerInteraction(folderName, collection) {
	createDirectory(folderName);
	const files = readFiles(folderName);
	// Save interaction into client
	for (const file of files) {
		const interactionName = file.split('.')[0];
		const interaction = require(`./${folderName}/${file}`);

		collection.set(interactionName, interaction);
		console.log(`Loaded ${folderName} ${interactionName}`);
	}
}

/**
 * Create directory if it doesn't exist
 */
function createDirectory(directory) {
	if (!fs.existsSync(`./${directory}`)) {
		fs.mkdirSync(`./${directory}`);
	}
}

/**
 * Find all the files in directory
 */
function readFiles(directory) {
	return fs
		.readdirSync(`./${directory}`)
		.filter((file) => file.endsWith('.js'));
}
