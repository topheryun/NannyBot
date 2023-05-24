const { SlashCommandBuilder } = require('@discordjs/builders');
var mysql = require('mysql');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('lolwinrates')
		.setDescription('ARAM winrates'),
	async execute(interaction) {
    console.log(`${interaction.user.username} is checking winrates.`);

    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "root",
      database: "ARAM",
      multipleStatements: true
    });

    con.connect(function(err) {
      if (err) throw err;
      con.query(
      "SELECT win FROM chanel;" + 
      "SELECT win FROM chris;" + 
      "SELECT win FROM eunjung;" +
      "SELECT win FROM james;"
      , function (err, results, fields) {
        if (err) throw err;
        chanelWR = (Math.round(calculateWinRate(results[0]) * 10000) / 100).toFixed(2) + '%'; chanelGamesPlayed = formatGamesPlayed(results[0].length);
        chrisWR = (Math.round(calculateWinRate(results[1]) * 10000) / 100).toFixed(2) + '%'; chrisGamesPlayed = formatGamesPlayed(results[1].length);
        eunjungWR = (Math.round(calculateWinRate(results[2]) * 10000) / 100).toFixed(2) + '%'; eunjungGamesPlayed = formatGamesPlayed(results[2].length);
        jamesWR = (Math.round(calculateWinRate(results[3]) * 10000) / 100).toFixed(2) + '%'; jamesGamesPlayed = formatGamesPlayed(results[3].length);

        interaction.reply({content: "```\n+------------------------------------+\n" + 
        "|              Winrates              |\n" + "+--------+--------+---------+--------+\n" +
        "| Chanel |  Chris | Eunjung |  James |\n+--------+--------+---------+--------+\n" +
        `| ${chanelWR} | ${chrisWR} |  ${eunjungWR} | ${jamesWR} |` + "\n+--------+--------+---------+--------+\n" + 
        `|  ${chanelGamesPlayed}   |  ${chrisGamesPlayed}   |  ${eunjungGamesPlayed}    |  ${jamesGamesPlayed}   |\n` +
        "+--------+--------+---------+--------+\n```", ephemeral: true});
      });
    });
	},
};

function calculateWinRate(result) {
  let wins = 0;
  for (let i = 0; i < result.length; i++) {
    if (result[i].win == 1) wins++;
  }
  return (wins / result.length);
}

function formatGamesPlayed(number) {
  if (number < 100) return ' ' + number;
  else return number;
}