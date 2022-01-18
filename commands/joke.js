const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require("node-fetch");

module.exports = {
	data: new SlashCommandBuilder()
	.setName('joke')
	.setDescription('I will attempt a joke.')
	.setDefaultPermission(false)
	.addSubcommand(subcommand =>
		subcommand
			.setName('oneliner')
			.setDescription('A single line joke.'))
	.addSubcommand(subcommand =>
		subcommand
			.setName('twopart')
			.setDescription('Joke with two parts.')),
	async execute(interaction) {
		if (interaction.options.getSubcommand() === 'oneliner') {
			console.log(`${interaction.user.username} asked for a one line joke.`);
      const response = await fetch("https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single");
      if (response.status == 200) {
        const data = await response.json();
        await interaction.reply({content: `I have a ${data.category} joke for you.\n${data.joke}`, ephemeral: true});
      }	
		}
		else if (interaction.options.getSubcommand() === 'twopart') {
			console.log(`${interaction.user.username} asked for a two line joke..`);
      const response = await fetch("https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=twopart");
      if (response.status == 200) {
        const data = await response.json();
        await interaction.reply({content: `I have a ${data.category} joke for you.\n${data.setup}\n${data.delivery}`, ephemeral: true});
      }
    }
	}
};
