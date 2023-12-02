const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('adminappeal')
		.setDescription('Admin Command.')
		.addStringOption((option) =>
			option
				.setName('action')
				.setDescription('Action')
				.setRequired(true)
				.addChoices(
					{ name: 'clear', value: 'clear' },
					{ name: 'get', value: 'get' },
				),
		),
	async execute(client, interaction) {
		const action = interaction.options.getString('action');
		if (action == 'get') {
			let messages = '';
			client.voteAppealCollection.map.forEach((i, m) => {
				messages = messages + i.user.id + ', ';
			});
			interaction.reply(messages);
		} else {
			client.voteAppealCollection = [];
			interaction.reply('cleared');
		}
	},
};
