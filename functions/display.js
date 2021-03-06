const { calculateAge } = require('../functions/age-calc');

function displayBirthday(day,month,year) {
  return `${year}-${month}-${day}`;
}

async function replyBirthday(interaction, data) {
  console.log(`${interaction.user.username} searched for ${data.name}' birthday.`);
  await interaction.reply({
    content: `${data.name}'s Birthday: ` + displayBirthday(data.day,data.month,data.year),
    ephemeral: true
  });
}

async function replyMultiBirthday(interaction, people) {
  let replyMessage = '';
  for (const person of people) {
    replyMessage += `${person.name}'s Birthday: ` + displayBirthday(person.day,person.month,person.year) + '\n'
  }
  await interaction.reply({ 
    content: replyMessage,
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
  replyAge,
  replyMultiBirthday
}