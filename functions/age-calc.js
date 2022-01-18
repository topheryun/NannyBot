function calculateAge(day,month,year) {
  const monthNumber = convertMonthToNumber(month);
  const birthday = new Date(year, monthNumber, day);
  const today = new Date();
  let result = { year: -1, month: -1, day: -1 };
  
  result.year = today.getFullYear() - birthday.getFullYear();

  result.month = today.getMonth() - birthday.getMonth();
  if (result.month < 0) {
    result.year -= 1;
    result.month += 12;
  }

  result.day = today.getDate() - birthday.getDate();
  if (result.day < 0) {
    result.month -= 1;
    result.day += numberOfDaysInMonth(today.getMonth());
  }
  
  return result;
}

function numberOfDaysInMonth(monthNumber) {
  // 28 days: Feb
  if (monthNumber == 1) return 28;
  // 30 days: Apr, Jun, Sep, Nov
  else if (monthNumber == 3 || monthNumber == 5 || monthNumber == 8 || monthNumber == 10) return 30;
  // 31 days: Jan, Mar, May, Jul, Aug, Oct, Dec
  else return 31;
}

function convertMonthToNumber(month) {
 switch (month) {
   case "Jan": return 0;
   case "Feb": return 1;
   case "Mar": return 2;
   case "Apr": return 3;
   case "May": return 4;
   case "Jun": return 5;
   case "Jul": return 6;
   case "Aug": return 7;
   case "Sep": return 8;
   case "Oct": return 9;
   case "Nov": return 10;
   case "Dec": return 11;
 }
 console.error("Could not convert the month to a number.");
}

module.exports = {
  calculateAge
}