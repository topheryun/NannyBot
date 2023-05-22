const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require("node-fetch");
const { chris_puuid } = require('./../aram.json');
const baseURL = "https://americas.api.riotgames.com";
const apiKey = "RGAPI-7a04de10-b29a-48bb-84a2-55c70a1054e2";

module.exports = {
	data: new SlashCommandBuilder()
		.setName('lolupdate')
		.setDescription('Updates LoL ARAM stats'),
	async execute(interaction) {
    console.log(`${interaction.user.username} updated the internal LoL stats`);
    const response = await fetch(`${baseURL}/lol/match/v5/matches/by-puuid/${chris_puuid}/ids?start=0&count=20&api_key=${apiKey}`);
    if (response.status == 200) {
      const data = await response.json();
      console.log(data);
      await interaction.reply({content: "The internal database has been updated.", ephemeral: true});
    }
    else {
      console.error("uh oh " + response.status);
    }
	},
};