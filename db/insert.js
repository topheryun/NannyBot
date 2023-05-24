var mysql = require('mysql');
const tableHeaders = "matchId, championName, win, kills, deaths, assists, kda, totalDamageDealtToChampions, damagePerMinute";
const fetch = require("node-fetch");
const { chris_puuid, chanel_puuid, eunjung_puuid, james_puuid } = require('./../aram.json');
const baseURL = "https://americas.api.riotgames.com";
const apiKey = "RGAPI-7a04de10-b29a-48bb-84a2-55c70a1054e2";

// get match data with matchId
async function insertMatchData(matchId) {
  const response = await fetch(`${baseURL}/lol/match/v5/matches/${matchId}?api_key=${apiKey}`);
  if (response.status == 200) {
    const data = await response.json();
    const players = data.info.participants;
    for (let i = 0; i < players.length; i++) {
      if (players[i].puuid == chris_puuid 
        || players[i].puuid == chanel_puuid 
        || players[i].puuid == eunjung_puuid 
        || players[i].puuid == james_puuid) {
        insertIntoDB(players[i], getPlayerName(players[i].puuid), matchId);
      }
    }
  }
  else {
    console.error("uh oh " + response.status);
  }
}

function insertIntoDB(player, playerName, matchId) {
  // connect to db
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "ARAM"
  });

  // insert into db
  con.connect(function(err) {
    if (err) throw err;
    var sql = `INSERT IGNORE INTO ${playerName} (${tableHeaders}) VALUES ('${matchId}', '${player.championName}', ${player.win}, ${player.kills}, ${player.deaths}, ${player.assists}, ${player.challenges.kda}, ${player.totalDamageDealtToChampions}, ${player.challenges.damagePerMinute});`;
    con.query(sql, function (err, result) {
      if (err) throw err;
    });
  });
}

function getPlayerName(puuid) {
  switch (puuid) {
    case chris_puuid:
      return "chris";
    case chanel_puuid:
      return "chanel";
    case eunjung_puuid:
      return "eunjung";
    case james_puuid:
      return "james";
    default: return null;
  }
}

module.exports = {
  insertMatchData
}