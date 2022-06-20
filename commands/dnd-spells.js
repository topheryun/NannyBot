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
        let outputString1 = "";
        let outputString2 = "";
        const limit = 70;
        let count = 0;
        for (const result in data.results) {
          count++;
          if (count < limit) {
            outputString1 += result.index + ", ";
          }
          else {
            outputString2 += result.index + ", ";
          }
          
        }
        // let message = [outputString1,outputString2];
        console.log(outputString1);
        console.log(outputString2);
        await interaction.reply({content: outputString1, ephemeral: true});
        await interaction.followup({content: outputString2, ephemeral: true});
      }
    }
    else {
      
    } 
	},
};