const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require("node-fetch");
const { RIOT_API, chris_puuid } = require('./../../aram.json');
const baseURL = "https://americas.api.riotgames.com";
const { insertMatchData } = require('./../../db/insert');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('lolupdate')
		.setDescription('Updates LoL ARAM stats for past 15 matches'),
	async execute(interaction) {
    console.log(`${interaction.user.username} updated the internal LoL stats`);
    const response = await fetch(`${baseURL}/lol/match/v5/matches/by-puuid/${chris_puuid}/ids?start=0&count=15&api_key=${RIOT_API}`);
    if (response.status == 200) {
      const data = await response.json();
      for (let i = 0; i < data.length; i++) {
        insertMatchData(data[i]);
      }
      await interaction.reply({content: "The internal database has been updated.", ephemeral: true});
    }
    else {
      console.error("uh oh " + response.status);
    }
	},
};