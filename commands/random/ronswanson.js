const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require("node-fetch");

module.exports = {
	data: new SlashCommandBuilder()
	.setName('ronswanson')
	.setDescription('Ron Swanson.'),
	async execute(interaction) {
    console.log(`${interaction.user.username} summoned Ron Swanson.`);
    const response = await fetch("http://ron-swanson-quotes.herokuapp.com/v2/quotes");
    if (response.status == 200) {
      const data = await response.json();
      await interaction.reply({content: `"${data}"\n-Ron Swanson`, ephemeral: true});
    }	
	}
};
