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
    console.log(`${interaction.user.username} is check ${interaction.options.getString('input')} stats.`);

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
        // console.log("results"); console.log(results[0]);
        chanelWR = formatWinRate(results[0]); chanelKDA = formatKDA(results[0]); chanelFrequency = formatFrequency(results[0]);
        chrisWR = formatWinRate(results[1]); chrisKDA = formatKDA(results[1]); chrisFrequency = formatFrequency(results[1]);
        eunjungWR = formatWinRate(results[2]); eunjungKDA = formatKDA(results[2]); eunjungFrequency = formatFrequency(results[2]);
        jamesWR = formatWinRate(results[3]); jamesKDA = formatKDA(results[3]); jamesFrequency = formatFrequency(results[3]);

        if (chanelFrequency == ' 0' && chrisFrequency == ' 0' && eunjungFrequency == ' 0' && jamesFrequency == ' 0') {
          interaction.reply({content: `Could not find any data on "${input}"`, ephemeral: true});
        }
        else {
          interaction.reply({content: `**.-${input}-.**` +
          "```\n+------------------------------------------------+\n" + 
          "|                 Champion Stats                 |\n+-----------+--------+--------+---------+--------+\n" + 
          "|  Summoner | Chanel |  Chris | Eunjung |  James |\n+-----------+--------+--------+---------+--------+\n" +
          `|  Winrate  | ${chanelWR} | ${chrisWR} |  ${eunjungWR} | ${jamesWR} |\n+-----------+--------+--------+---------+--------+\n` +
          `|    KDA    |  ${chanelKDA} |  ${chrisKDA} |  ${eunjungKDA}  |  ${jamesKDA} |\n+-----------+--------+--------+---------+--------+\n` +
          `| Frequency |   ${chanelFrequency}   |   ${chrisFrequency}   |    ${eunjungFrequency}   |   ${jamesFrequency}   |\n+-----------+--------+--------+---------+--------+\n` +
          "```", ephemeral: true});
        }
   
      });
    });
	},
};

function formatWinRate(result) {
  if (result[0] == null) return 'xx.xx%';

  let formattedResult = (Math.round(calculateWinRate(result) * 10000) / 100).toFixed(2) + '%';
  if (formattedResult == '0.00%') {
    return '00.00%';
  }
  else if (formattedResult == '100.00%') {
    return '100.0%';
  }
  return formattedResult;
}

function calculateWinRate(result) {
  let wins = 0;
  for (let i = 0; i < result.length; i++) {
    if (result[i].win == 1) wins++;
  }
  return (wins / result.length);
}

function formatKDA(result) {
  if (result[0] == null) return 'xx.xx';

  let formattedResult = (Math.round(calculateKDA(result) * 100) / 100).toFixed(2) + '';
  if (formattedResult.length == 4) {
    formattedResult = ' ' + formattedResult;
  }
  return formattedResult;
}

function calculateKDA(result) {
  let average = 0;
  for (let i = 0; i < result.length; i++) {
    average += result[i].kda;
  }
  return average / result.length;
}

function formatFrequency(result) {
  if (result.length < 10) return ' ' + result.length;
  else return '' + result.length;
}