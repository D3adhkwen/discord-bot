const { Client, Intents, Collection } = require("discord.js");
const fs = require("fs");
const config = require("./config.js");
require('dotenv').config();

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_PRESENCES
  ]
});

client.config = config;
client.commands = new Collection();
client.buttons = new Collection();
client.messageCommands = new Collection();
client.suggestCooldown = new Collection();
client.marketplaceCooldown = new Collection();

// Debug
if (config.debug)
  client.on("debug", (e) => console.info(e));

// Load all events
if (!fs.existsSync("./events")) fs.mkdirSync("./events")
const events = fs.readdirSync("./events").filter(file => file.endsWith(".js"));
for (const file of events) {
  const eventName = file.split(".")[0];
  const event = require(`./events/${file}`);
  client.on(eventName, event.bind(null, client));
  console.log(`Loaded event ${eventName}`);
}

// Load all buttons
if (!fs.existsSync("./buttons")) fs.mkdirSync("./buttons")
const buttons = fs.readdirSync("./buttons").filter(file => file.endsWith(".js"));
for (const file of buttons) {
  const buttonName = file.split(".")[0];
  const button = require(`./buttons/${file}`);

  client.buttons.set(buttonName, button);
  console.log(`Loaded button ${buttonName}`);
}

// Load all message commands
if (!fs.existsSync("./messageCommands")) fs.mkdirSync("./messageCommands")
const messageCommands = fs.readdirSync("./messageCommands").filter(file => file.endsWith(".js"));
for (const file of messageCommands) {
  const messageCommandName = file.split(".")[0];
  const messageCommand = require(`./messageCommands/${file}`);

  client.messageCommands.set(messageCommandName, messageCommand);
  console.log(`Loaded messageCommand ${messageCommandName}`);
}

// Load all slash commands
if (!fs.existsSync("./commands")) fs.mkdirSync("./commands")
const commands = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
for (const file of commands) {
  const commandName = file.split(".")[0];
  const command = require(`./commands/${file}`);

  client.commands.set(commandName, command);
  console.log(`Loaded command ${commandName}`);
}

client.login(process.env.DISCORD_TOKEN);
