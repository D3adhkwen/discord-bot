const { ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle } = require('discord.js');
const utils = require('../utils.js');

module.exports = {
	async execute(client, interaction) {
		const channelId = interaction.values[0];
		const channelName = utils.getChannelName(client, channelId);

		const modal = new ModalBuilder()
			.setCustomId(`suggestion-${channelId}`)
			.setTitle(`${channelName} Suggestion`);

		const suggestion = new TextInputBuilder()
			.setCustomId('suggestion')
			.setRequired()
			.setLabel('What\'s your suggestion?')
			.setPlaceholder('Please explain in detail or we won\'t consider it!')
			.setStyle(TextInputStyle.Paragraph);

		const row = new ActionRowBuilder()
			.addComponents(suggestion);

		modal.addComponents(row);

		await interaction.showModal(modal);

		// reset selection
		await interaction.editReply({
			components: [utils.createSuggestionSelectMenu(client)],
		});
	},
};
