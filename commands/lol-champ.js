const { SlashCommandBuilder } = require('@discordjs/builders');
var mysql = require('mysql');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('lolchamp')
		.setDescription('ARAM Champion Stats')
    .addStringOption(option =>
      option.setName('input')
      .setDescription('The input to echo back')
      .setRequired(true)),
	async execute(interaction) {
    console.log(`${interaction.user.username} is check champion stats.`);

    const input = interaction.options.getString('input');

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
      "SELECT * FROM chanel WHERE championName = '" + input + "';" + 
      "SELECT * FROM chris WHERE championName = '" + input + "';" + 
      "SELECT * FROM eunjung WHERE championName = '" + input + "';" +
      "SELECT * FROM james WHERE championName = '" + input + "';"
      , function (err, results, fields) {
        if (err) throw err;
        // console.log("results:")
        // console.log(results)
        // console.log("results[0]:")
        // console.log(results[0])
     
        chanelWR = formatWinRate(results[0]);
        chrisWR = formatWinRate(results[1]);
        eunjungWR = formatWinRate(results[2]);
        jamesWR = formatWinRate(results[3]);
        
        // +------------------------------------------------+
        // |                    Champion                    |
        // +-----------+--------+--------+---------+--------+
        // |  Summoner | Chanel |  Chris | Eunjung |  James |
        // +-----------+--------+--------+---------+--------+
        // |  Winrate  | xx.xx% | xx.xx% |  xx.xx% | xx.xx% |
        // +-----------+--------+--------+---------+--------+
        // |    KDA    |  xx.xx |  xx.xx |  xx.xx  |  xx.xx |
        // +-----------+--------+--------+---------+--------+
        // | Frequency |   xx   |   xx   |    xx   |   xx   |
        // +-----------+--------+--------+---------+--------+

        interaction.reply({content: "```\n+------------------------------------+\n" + 
        "|              Winrates              |\n" + "+--------+--------+---------+--------+\n" +
        "| Chanel |  Chris | Eunjung |  James |\n+--------+--------+---------+--------+\n" +
        "| " + chanelWR + " | " + chrisWR + " | " + eunjungWR + "  | " + jamesWR +
        " |\n+--------+--------+---------+--------+" + "```", ephemeral: true});
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

function formatWinRate(result) {
  console.log(result);
  if (result[0] == null) return 'xx.xx%';

  let formattedResult = (Math.round(calculateWinRate(result) * 10000) / 100).toFixed(2) + '%';
  if (formattedResult == 'NaN%') {
    return '00.00%';
  }
  else if (formattedResult == '0.00%') {
    return '00.00%';
  }
  else if (formattedResult == '100.00%') {
    return '100.0%';
  }
  return formattedResult;
}