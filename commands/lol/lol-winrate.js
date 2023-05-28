const { SlashCommandBuilder } = require('@discordjs/builders');
var mysql = require('mysql');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('lolstats')
		.setDescription('ARAM winrates'),
	async execute(interaction) {
    console.log(`${interaction.user.username} is checking stats.`);

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
      "SELECT * FROM chanel;" + 
      "SELECT * FROM chris;" + 
      "SELECT * FROM eunjung;" +
      "SELECT * FROM james;"
      , function (err, results, fields) {
        if (err) throw err;
        chanelWR = (Math.round(calculateWinRate(results[0]) * 10000) / 100).toFixed(2) + '%'; chanelGamesPlayed = formatGamesPlayed(results[0].length);
        chrisWR = (Math.round(calculateWinRate(results[1]) * 10000) / 100).toFixed(2) + '%'; chrisGamesPlayed = formatGamesPlayed(results[1].length);
        eunjungWR = (Math.round(calculateWinRate(results[2]) * 10000) / 100).toFixed(2) + '%'; eunjungGamesPlayed = formatGamesPlayed(results[2].length);
        jamesWR = (Math.round(calculateWinRate(results[3]) * 10000) / 100).toFixed(2) + '%'; jamesGamesPlayed = formatGamesPlayed(results[3].length);

        chanelKDA = calculateAverageKDA(results[0]);
        chrisKDA = calculateAverageKDA(results[1]);
        eunjungKDA = calculateAverageKDA(results[2]);
        jamesKDA = calculateAverageKDA(results[3]);

        chanelAverageDamage = calculateAverageDamage(results[0]);
        chrisAverageDamage = calculateAverageDamage(results[1]);
        eunjungAverageDamage = calculateAverageDamage(results[2]);
        jamesAverageDamage = calculateAverageDamage(results[3]);

        chanelFavorite = findFavorite(results[0]);
        chrisFavorite = findFavorite(results[1]);
        eunjungFavorite = findFavorite(results[2]);
        jamesFavorite = findFavorite(results[3]);

        interaction.reply({content: "```\n" + 
        "+-----------+------------+------------+------------+------------+\n" +
        "|  Summoner |   Chanel   |    Chris   |   Eunjung  |    James   |\n" +
        "+-----------+------------+------------+------------+------------+\n" +
        `|  Winrate  |   ${chanelWR}   |   ${chrisWR}   |   ${eunjungWR}   |   ${jamesWR}   |\n` + 
        "+-----------+------------+------------+------------+------------+\n" +
        `|   Games   |    ${chanelGamesPlayed}     |    ${chrisGamesPlayed}     |    ${eunjungGamesPlayed}     |    ${jamesGamesPlayed}     |\n` +
        "+-----------+------------+------------+------------+------------+\n" +
        `|    KDA    |   ${chanelKDA}    |   ${chrisKDA}    |   ${eunjungKDA}    |   ${jamesKDA}    |\n` +
        "+-----------+------------+------------+------------+------------+\n" +
        `|   Damage  |    ${chanelAverageDamage}   |    ${chrisAverageDamage}   |   ${eunjungAverageDamage}    |    ${jamesAverageDamage}   |\n` +
        "+-----------+------------+------------+------------+------------+\n" +
        `| Frequency |${chanelFavorite}|${chrisFavorite}|${eunjungFavorite}|${jamesFavorite}|\n` +
        "+-----------+------------+------------+------------+------------+\n" +
        "```"});
      });
    });
	},
}

function findFavorite(array)
{
    if(array.length == 0)
        return null;
    var modeMap = {};
    var maxEl = array[0], maxCount = 1;
    for(var i = 0; i < array.length; i++)
    {
        var el = array[i].championName;
        if(modeMap[el] == null)
            modeMap[el] = 1;
        else
            modeMap[el]++;  
        if(modeMap[el] > maxCount)
        {
            maxEl = el;
            maxCount = modeMap[el];
        }
    }
    return formatFavorite(maxEl);
}

function formatFavorite(name) {
  switch(name.length) {
    case 2: return '     ' + name + '     ';
    case 3: return '     ' + name + '    ';
    case 4: return '    ' + name + '    ';
    case 5: return '    ' + name + '   ';
    case 6: return '   ' + name + '   ';
    case 7: return '   ' + name + '  ';
    case 8: return '  ' + name + '  ';
    case 9: return '  ' + name + ' ';
    case 10: return ' ' + name + ' ';
    case 11: return ' ' + name;
    default: return name.slice(12);
  }
}

function calculateAverageDamage(result) {
  let average = 0;
  for (let i = 0; i < result.length; i++) {
    average += result[i].totalDamageDealtToChampions;
  }
  average = (Math.round((average / result.length) * 100) / 100).toFixed(0);
  return average;
}

function calculateAverageKDA(result) {
  let kda = 0;
  for (let i = 0; i < result.length; i++) {
    kda += result[i].kda;
  }
  kda = (Math.round((kda / result.length) * 100) / 100).toFixed(2);
  if (kda >= 10.0) {
    return '' + kda;
  } else return ' ' + kda;
}

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