const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require("node-fetch");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dndspells')
		.setDescription('Searches for cards via Scryfall.')
    .addStringOption(option =>
      option.setName('input')
      .setDescription('The input to echo back')
      .setRequired(true)),
	async execute(interaction) {
    if (interaction.options.getString('input') === 'all') {
      console.log(`${interaction.user.username} wants to see all dnd spells.`);
      const response = await fetch("https://www.dnd5eapi.co/api/spells/");
      if (response.status == 200) {
        const data = await response.json();
        let outputString = "";
        for (const result in data.results) {
          outputString += result.index + ", ";
        }
        await interaction.reply({content: outputString, ephemeral: true});
      }
    }
    else {
      
    } 
	},
};