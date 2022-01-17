/**
 * takes the birthday values from birthdays.json and returns them 
 * in YYYY-MM-DD format, because that's the only format that makes
 * sense.
 * @param day Number
 * @param month Three character String
 * @param year Number
 * @return String
 */
function displayBirthday(day,month,year) {
  return `${year}-${month}-${day}`;
}

module.exports = {
  displayBirthday
}