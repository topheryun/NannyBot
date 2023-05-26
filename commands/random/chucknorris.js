const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require("node-fetch");

module.exports = {
	data: new SlashCommandBuilder()
	.setName('chucknorris')
	.setDescription('Chuck Norris.'),
	async execute(interaction) {
    console.log(`${interaction.user.username} summoned Chuck Norris.`);
    const response = await fetch("https://api.chucknorris.io/jokes/random");
    if (response.status == 200) {
      const data = await response.json();
      await interaction.reply({content: `${data.value}`, ephemeral: true});
    }	
	}
};
