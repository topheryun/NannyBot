const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require("node-fetch");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dndspells')
		.setDescription('Searches for D&D Spells.')
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
        let outputString3 = "";
        const limit1 = 130;
        const limit2 = 260;
        let count = 0;
        for (let i = 0; i < data.count; i++) {
          count++;
          if (count < limit1) {
            outputString1 += data.results[i].index + ", ";
          }
          else if(count < limit2) {
            outputString2 += data.results[i].index + ", ";
          }
          else {
            outputString3 += data.results[i].index + ", ";
          }
          
        }
        await interaction.reply({content: outputString1, ephemeral: true});
        await interaction.followUp({content: outputString2, ephemeral: true});
        await interaction.followUp({content: outputString3, ephemeral: true});
      }
    }
    else {
      console.log(`${interaction.user.username} looked up ` + interaction.options.getString('input'));
      const input = interaction.options.getString('input');
      const response = await fetch("https://www.dnd5eapi.co/api/spells/");
      if (response.status == 200) {
        let isFound = false;
        const data = await response.json();
        for (let i = 0; i < data.count; i++) {
          if (data.results[i].index = input) {
            isFound = true;
          }
        }
        if (isFound) {
          const response = await fetch("https://www.dnd5eapi.co/api/spells/" + input);
          if (response.status == 200) {
            const data = await response.json();
            let components = data.components[0];
            for (let i = 1; i < data.components.length; i++) {
              components += ", " + data.components[i];
            }
            let description = data.desc[0];
            for (let i = 1; i < data.desc.length; i++) {
              description += "\n" + data.desc[i];
            }
            let message = "Name: " + data.name + "\n" + description + "\nLevel: " + data.level +  "\nHigher Level: " + data.higher_level[0] 
                          + "\nRange: " + data.range + "\nComponents: " + components + "\nMaterial: " + data.material + "\nRitual: "
                          + data.ritual + "\nDuration: " + data.duration + "\nConcentration: " + data.concentration + "\nCasting Time: " 
                          + data.casting_time + "\nAttack Type: " + data.attack_type + "\nSchool: " + data.school.name;
            if (data.damage) {
              message += "\nDamage Type: " + data.damage.damage_type.name;
            }
                          
            await interaction.reply({content: message, ephemeral: true});
          }
        }
        else await interaction.reply({content: "Spell must be exact match.", ephemeral: true});
      }
    } 
	},
};