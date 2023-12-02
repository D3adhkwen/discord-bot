module.exports = (client) => {
	const botspam = client.channels.cache.get(client.config.botspam);
	console.log(`Logged in as ${client.user.tag}!`);
	botspam.send('Bot is now running.');
};
