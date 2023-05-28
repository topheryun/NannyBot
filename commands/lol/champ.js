const { SlashCommandBuilder } = require('@discordjs/builders');
var mysql = require('mysql');
const allChampionNames = [
  'aatrox','ahri','akali','akshan','alistar','amumu','anivia','annie','aphelios','ashe','aurelionsol','azir','bard','belveth',
  'blitzcrank','brand','braum','caitlyn','camille','cassiopeia','chogath','corki','darius','diana','draven','drmundo','ekko',
  'elise','evelynn','ezreal','fiddlesticks','fiora','fizz','galio','gangplank','garen','gnar','gragas','graves','gwen','hecarim',
  'heimerdinger','illaoi','irelia','ivern','janna','jarvaniv','jax','jayce','jhin','jinx','kaisa','kalista','karma','karthus',
  'kassadin','katarina','kayle','kayn','kennen','khazix','kindred','kled','kogmaw','ksante','leblanc','leesin','leona','lillia',
  'lissandra','lucian','lulu','lux','malphite','malzahar','maokai','masteryi','milio','missfortune','monkeyking','mordekaiser',
  'morgana','nami','nasus','nautilus','neeko','nidalee','nilah','nocturne','nunu','olaf','orianna','ornn','pantheon','poppy',
  'pyke','qiyana','quinn','rakan','rammus','reksai','rell','renata','renekton','rengar','riven','rumble','ryze','samira','sejuani',
  'senna','seraphine','sett','shaco','shen','shyvana','singed','sion','sivir','skarner','sona','soraka','swain','sylas','syndra',
  'tahmkench','taliyah','talon','taric','teemo','thresh','tristana','trundle','tryndamere','twistedfate','twitch','udyr','urgot',
  'varus','vayne','veigar','velkoz','vex','vi','viego','viktor','vladimir','volibear','warwick','xayah','xerath','xinzhao','yasuo',
  'yone','yorick','yuumi','zac','zed','zeri','ziggs','zilean','zoe','zyra'
];

module.exports = {
	data: new SlashCommandBuilder()
		.setName('lolchamp')
		.setDescription('ARAM Champion Stats')
    .addStringOption(option =>
      option.setName('input')
      .setDescription('Champion Name')
      .setRequired(true)),
	async execute(interaction) {
    let input = interaction.options.getString('input').toLowerCase();
    console.log(`${interaction.user.username} is checking ${input} stats.`);
    input = formatChampionNameInput(input);

    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "root",
      database: "ARAM",
      multipleStatements: true
    });

    con.connect(function(err) {
      if (!allChampionNames.includes(input)) {
        interaction.reply({content: "```\n" + `"${input}" is not the correct spelling\nHere is a list of all the champion names:\n${allChampionNames}` + "\n```", ephemeral: true});
        return;
      }

      if (err) throw err;
      con.query(
      "SELECT * FROM chanel WHERE championName = '" + input + "';" + 
      "SELECT * FROM chris WHERE championName = '" + input + "';" + 
      "SELECT * FROM eunjung WHERE championName = '" + input + "';" +
      "SELECT * FROM james WHERE championName = '" + input + "';"
      , function (err, results, fields) {
        if (err) throw err;
        chanelWR = formatWinRate(results[0]); chanelKDA = formatKDA(results[0]); chanelFrequency = formatFrequency(results[0]);
        chrisWR = formatWinRate(results[1]); chrisKDA = formatKDA(results[1]); chrisFrequency = formatFrequency(results[1]);
        eunjungWR = formatWinRate(results[2]); eunjungKDA = formatKDA(results[2]); eunjungFrequency = formatFrequency(results[2]);
        jamesWR = formatWinRate(results[3]); jamesKDA = formatKDA(results[3]); jamesFrequency = formatFrequency(results[3]);

        if (chanelFrequency == ' 0' && chrisFrequency == ' 0' && eunjungFrequency == ' 0' && jamesFrequency == ' 0') {
          interaction.reply({content: `Could not find any records on "${input}"`, ephemeral: true});
        }
        else {
          interaction.reply({content: `**.-${input}-.**` +
          "```\n" +
          "+---------------------------------------------------+\n" + 
          "|                   Champion Stats                  |\n" + 
          "+--------------+--------+--------+---------+--------+\n" + 
          "|   Summoner   | Chanel |  Chris | Eunjung |  James |\n" +
          "+--------------+--------+--------+---------+--------+\n" +
          `|    Winrate   | ${chanelWR} | ${chrisWR} |  ${eunjungWR} | ${jamesWR} |\n` +
          "+--------------+--------+--------+---------+--------+\n" +
          `|     KDA      |  ${chanelKDA} |  ${chrisKDA} |  ${eunjungKDA}  |  ${jamesKDA} |\n` +
          "+--------------+--------+--------+---------+--------+\n" +
          `| Games Played |   ${chanelFrequency}   |   ${chrisFrequency}   |    ${eunjungFrequency}   |   ${jamesFrequency}   |\n` +
          "+--------------+--------+--------+---------+--------+\n" +
          "```", ephemeral: true});
        }
   
      });
    });
	},
}

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

function formatChampionNameInput(name) {
  switch (name) {
    case 'cow': return 'alistar';
    case 'asol': return 'aurelionsol';
    case 'blitz': return 'blitzcrank';
    case 'cait': return 'caitlyn';
    case 'cass': return 'cassiopeia';
    case 'cassio': return 'cassiopeia';
    case 'cho': return 'chogath';
    case 'mundo': return 'drmundo';
    case 'eve': return 'evelynn';
    case 'ez': return 'ezreal';
    case 'fiddle': return 'fiddlesticks';
    case 'gp': return 'gangplank';
    case 'heimer': return 'heimerdinger';
    case 'j4': return 'jarvaniv';
    case 'kass': return 'kassadin';
    case 'kat': return 'katarina';
    case 'liss': return 'lissandra';
    case 'malph': return 'malphite';
    case 'malz': return 'malzahar';
    case 'mf': return 'missfortune';
    case 'wukong': return 'monkeyking';
    case 'yi': return 'masteryi';
    case 'morde': return 'mordekaiser';
    case 'sej': return 'sejuani';
    case 'sera': return 'seraphine';
    case 'shyv': return 'shyvana';
    case 'raka': return 'soraka';
    case 'tk': return 'tahmkench';
    case 'trist': return 'tristana';
    case 'tryn': return 'tryndamere';
    case 'tf': return 'twistedfate';
    case 'vlad': return 'vladimir';
    case 'voli': return 'volibear';
    case 'bear': return 'volibear';
    case 'ww': return 'warwick';
    case 'xin': return 'xinzhao';
    case 'zil': return 'zilean';
    default: return name;
  }
}