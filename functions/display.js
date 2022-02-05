const { calculateAge } = require('../functions/age-calc');

function displayBirthday(day,month,year) {
  return `${year}-${month}-${day}`;
}

async function replyBirthday(interaction, name, day, month, year) {
  console.log(`${interaction.user.username} searched for ${name}' birthday.`);
  await interaction.reply({
    content: `${name}'s Birthday: ` + displayBirthday(day,month,year),
    ephemeral: true
  });
}

async function replyAge(interaction, name, day, month, year) {
  console.log(`${interaction.user.username} searched ${name}'s age.`);
    const age = calculateAge(day,month,year);
    await interaction.reply({
      content: `${name}'s age is ${age.year} years, ${age.month} months, and ${age.day} days.`,
      ephemeral: true
    });
}

module.exports = {
  displayBirthday,
  replyBirthday,
  replyAge
}