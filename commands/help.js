const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Just gives you all commands available.')
		.setDefaultPermission(false),
	async execute(interaction) {
    console.log(`${interaction.user.username} asked for help.`);
		await interaction.reply({
      content: `age\nbirthday\ncat\nchucknorris\njoke\nronswanson\nweather`,
      ephemeral: true
    });
	},
};