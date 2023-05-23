var mysql = require('mysql');
const tableHeaders = "matchId, championName, win, kills, deaths, assists, kda, totalDamageDealtToChampions, damagePerMinute";
const fetch = require("node-fetch");
const { chris_puuid, chanel_puuid, eunjung_puuid, james_puuid } = require('./../aram.json');
const baseURL = "https://americas.api.riotgames.com";
const apiKey = "RGAPI-7a04de10-b29a-48bb-84a2-55c70a1054e2";
const matchId = "NA1_4662533119";
matchData = {"matchId": matchId, "championName": "", "win": "", "kills": "", "deaths": "", "assists": "", "kda": "", "totalDamageDealtToChampions": "", "damagePerMinute": ""};

const response = await fetch(`${baseURL}/lol/match/v5/matches/${matchId}?api_key=${apiKey}`);
if (response.status == 200) {
  const data = await response.json();
  console.log(data.metadata.matchId);
  const players = data.info.participants;
  for (let i = 0; i < players.length; i++) {
    if (players.puuid == chris_puuid) {
      matchData.championName = players[i].championName;
      matchData.win = players[i].win;
      matchData.kills = players[i].kills;
      matchData.deaths = players[i].deaths;
      matchData.assists = players[i].assists;
      matchData.kda = players[i].challenges.kda;
      matchData.totalDamageDealtToChampions = players[i].totalDamageDealtToChampions;
      matchData.damagePerMinute = players[i].challenges.damagePerMinute;
    }
  }
}
else {
  console.error("uh oh " + response.status);
}

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "ARAM"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = `INSERT INTO chris (${tableHeaders}) VALUES ('Company Inc', 'Highway 37')`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
});