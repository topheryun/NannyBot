const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('info')
	.setDescription('Get info about a user or a server!')
	.setDefaultPermission(false)
	.addSubcommand(subcommand =>
		subcommand
			.setName('user')
			.setDescription('Info about a user')
			.addUserOption(option => option.setName('target').setDescription('The user')))
	.addSubcommand(subcommand =>
		subcommand
			.setName('server')
			.setDescription('Info about the server')),
	async execute(interaction) {
		if (interaction.options.getSubcommand() === 'server') {
			await interaction.reply({content: 'server info...', ephemeral: true});
		}
		else await interaction.reply({content: 'user info...', ephemeral: true});
	}
};
