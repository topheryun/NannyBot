// 93988c7064fb49e881b21832221801 kep for weatherapi.com
const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require("node-fetch");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('weather')
		.setDescription('Weather for Fort Worth')
		.setDefaultPermission(false),
	async execute(interaction) {
    console.log(`${interaction.user.username} checked the weather.`);
    let response = await fetch("https://api.weatherapi.com/v1/current.json?key=93988c7064fb49e881b21832221801&q=Fort%20Worth&aqi=no");
    if (response.status == 200) {
      const data = await response.json();
      await interaction.reply({
        // location, temp, condition, humidity, feels like, last updated
        content: `Location: ${data.location.name}, ${data.location.region}\nTemperature: ${data.current.temp_f} F\nCondition: ${data.current.condition.text}.\nHumidity: ${data.current.humidity}\nFeels Like: ${data.current.feelslike_f} F\nLast Updated: ${data.current.last_updated}`,
        ephemeral: true
      });
    }

    // const dateToday = new Date();
    // const monthToday = convertMonthToNumber(dateToday.getMonth());
    // const dateAppend = dateToday.getFullYear() + '-' + monthToday + '-' + dateToday.getDate();
    // response = await fetch("https://api.weatherapi.com/v1/astronomy.json?key=93988c7064fb49e881b21832221801&q=Fort Worth&dt=" + dateAppend);
    // if (response.status == 200) {
    //   const data = await response.json();
    //   await interaction.reply({
    //     content: `Sunrise: ${data.astronomy.astro.sunrise}\nSunset: ${data.astronomy.astro.sunset}`,
    //     ephemeral: true
    //   });
    // }
    // await interaction.reply({content: 'I actually have no idea.', ephemeral: true});
	},
};

function convertMonthToNumber(month) {
  switch (month) {
    case 0: return '01';
    case 1: return '02';
    case 2: return '03';
    case 3: return '04';
    case 4: return '05';
    case 5: return '06';
    case 6: return '07';
    case 7: return '08';
    case 8: return '09';
    case 9: return '10';
    case 10: return '11';
    case 11: return '12';
  }
}