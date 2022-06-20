const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require("node-fetch");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mtg')
		.setDescription('Searches for cards via Scryfall.')
    .addStringOption(option =>
      option.setName('input')
      .setDescription('The input to echo back')
      .setRequired(true)),
	async execute(interaction) {
    if (interaction.options.getString('input') === 'random') {
      console.log(`${interaction.user.username} wants to see a random MTG card.`);
      const response = await fetch("https://api.scryfall.com/cards/random");
      if (response.status == 200) {
        const data = await response.json();
        await interaction.reply({files: [data.image_uris.normal], ephemeral: true});
      }
    }
    else {
      let fuzzyAppend = interaction.options.getString('input');
      console.log(`${interaction.user.username} searched for a MTG card with the string: ${fuzzyAppend}`);
      let autocompleteAppend = fuzzyAppend;
      if (fuzzyAppend.includes(' ')) {
        fuzzyAppend = fuzzyAppend.replaceAll(' ', '%20');
      }
      if (autocompleteAppend.includes(' ')) {
        autocompleteAppend = autocompleteAppend.substring(0, autocompleteAppend.indexOf(' '));
      }
      let response = await fetch("https://api.scryfall.com/cards/named?fuzzy=" + fuzzyAppend);
      if (response.status == 200) {
        const data = await response.json();
        await interaction.reply({files: [data.image_uris.normal], ephemeral: false});
      }
      else if (response.status == 404) {
        response = await fetch("https://api.scryfall.com/cards/autocomplete?q=" + autocompleteAppend);
        if (response.status == 200) {
          const data = await response.json();
          if (data.data.length == 0) {
            await interaction.reply({content: `Seriously? Try searching better.`, ephemeral: true});
          } else {
            const botResponse = JSON.stringify(data.data);
            await interaction.reply({content: `Try one of these: ` + botResponse, ephemeral: true})
          }
        }
      }
    } 
	},
};