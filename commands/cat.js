const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require("node-fetch");

module.exports = {
	data: new SlashCommandBuilder()
	.setName('cat')
	.setDescription('Cat pic.'),
	async execute(interaction) {
    console.log(`${interaction.user.username} summoned a cat.`);
    const response = await fetch("https://api.thecatapi.com/v1/images/search");
    if (response.status == 200) {
      const data = await response.json();
      await interaction.reply({files: [data[0].url], ephemeral: true});
    }	
	}
};
