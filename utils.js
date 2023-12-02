// Import this to use the functions
// const utils = require("../utils.js");

const { StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder, EmbedBuilder } = require('discord.js');
const humanizeDuration = require('humanize-duration');
require('dotenv')
	.config();

exports.isStaff = (client, input) => {
	const allowedRoles = client.config.staffrole;
	return input.member.roles.cache.some((role) =>
		allowedRoles.includes(role.name),
	);
};

exports.formatCooldown = (cooldown) => {
	return humanizeDuration(cooldown - Date.now(), {
		conjunction: ' and ',
		serialComma: false,
		round: true,
	});
};

exports.updateServerStats = (client) => {
	const memberCountChannel = client.channels.cache.get(
		client.config.membercount,
	);
	const userCountChannel = client.channels.cache.get(client.config.usercount);
	const botCountChannel = client.channels.cache.get(client.config.botcount);
	const guild = client.guilds.cache.get(process.env.GUILD_ID);

	const memberCount = guild.memberCount;
	const botCount = client.config.botCount;
	const userCount = memberCount - botCount;

	memberCountChannel.setName(`Member Count: ${memberCount}`);
	userCountChannel.setName(`User Count: ${userCount}`);
	botCountChannel.setName(`Bot Count: ${botCount}`);
};

exports.getChannelName = (client, channelId) => {
	let name;
	if (client.config.survivalsuggestion === channelId) {
		name = 'Survival';
	} else if (client.config.skyblocksuggestion === channelId) {
		name = 'Skyblock';
	} else if (client.config.rpgsuggestion === channelId) {
		name = 'RPG';
	} else if (client.config.duelssuggestion === channelId) {
		name = 'Duels';
	} else if (client.config.eventssuggestion === channelId) {
		name = 'Events';
	}
	return name;
};

exports.createSuggestionSelectMenu = (client) => {
	const select = new StringSelectMenuBuilder()
		.setCustomId('suggestion')
		.setPlaceholder('Select a gamemode')
		.addOptions(
			new StringSelectMenuOptionBuilder()
				.setLabel('Survival')
				.setValue(client.config.survivalsuggestion),
			new StringSelectMenuOptionBuilder()
				.setLabel('Skyblock')
				.setValue(client.config.skyblocksuggestion),
			new StringSelectMenuOptionBuilder()
				.setLabel('RPG')
				.setValue(client.config.rpgsuggestion),
			new StringSelectMenuOptionBuilder()
				.setLabel('Duels')
				.setValue(client.config.duelssuggestion),
			new StringSelectMenuOptionBuilder()
				.setLabel('Event')
				.setValue(client.config.eventssuggestion),
		);

	const row = new ActionRowBuilder()
		.addComponents(select);

	return row;
};
