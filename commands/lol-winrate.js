const { SlashCommandBuilder } = require('@discordjs/builders');
var mysql = require('mysql');
let chanelWR, chrisWR, eunjungWR, jamesWR;

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
        chanelWR = calculateWinRate(results[0]);
        chrisWR = calculateWinRate(results[1]);
        eunjungWR = calculateWinRate(results[2]);
        jamesWR = calculateWinRate(results[3]);
        console.log(chanelWR);
      });
    });
// ```
// +--------+--------+---------+--------+
// | Chanel |  Chris | Eunjung |  James |
// +--------+--------+---------+--------+
// | 11.11% | 11.11% |  11.11% | 11.11% |
// +--------+--------+---------+--------+
// ```
    await interaction.reply({content: "```\n" + "+--------+--------+---------+--------+\n" +
    "| Chanel |  Chris | Eunjung |  James |\n+--------+--------+---------+--------+\n" +
    "| " + chanelWR + " | " + chrisWR + " | " + eunjungWR + " | " + jamesWR +
    " |\n+--------+--------+---------+--------+" + "```", ephemeral: true});
	},
};

function calculateWinRate(result) {
  let wins = 0;
  for (let i = 0; i < result.length; i++) {
    if (result[i].win == 1) wins++;
  }
  return (wins / result.length);
}