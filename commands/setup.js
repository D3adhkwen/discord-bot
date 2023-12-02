const { ActionRowBuilder, EmbedBuilder, SlashCommandBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');
const utils = require('../utils.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setup')
		.setDescription('Setup interaction')
		.addStringOption((option) =>
			option
				.setName('interaction')
				.setDescription('The interaction to setup')
				.setRequired(true),
		),
	async execute(client, interaction) {
		const interactionName = interaction.options.getString('interaction');

		if (interactionName === 'suggestion') {
			setupSuggestion(client, interaction);
		} else {
			return await interaction.reply({
				content: 'Module does not exist.',
				ephemeral: true,
			});
		}

		await interaction.reply({
			content: `The interaction ${interactionName} has been setup`,
			ephemeral: true,
		});
	},
};

async function setupSuggestion(client, interaction) {
	const embed = new EmbedBuilder()
		.setTitle('Make a Suggestion')
		.setDescription('Submit your suggestion by choosing a gamemode from the menu below');

	await interaction.channel.send({
		embeds: [embed],
		components: [utils.createSuggestionSelectMenu(client)],
	});
}
