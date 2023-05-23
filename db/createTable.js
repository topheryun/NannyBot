var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "ARAM"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "CREATE TABLE chris (matchId VARCHAR(255) PRIMARY KEY, championName VARCHAR(255), win BOOL, kills INT(255), deaths INT(255), assists INT(255), kda DOUBLE(255,2), totalDamageDealtToChampions INT(255), damagePerMinute DOUBLE(255,2))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
}); 