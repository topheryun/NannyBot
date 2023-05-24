function calculateWinRate(result) {
  let wins = 0;
  for (let i = 0; i < result.length; i++) {
    if (result[i].win == 1) wins++;
  }
  return (wins / result.length);
}

module.exports = {
  calculateWinRate
}