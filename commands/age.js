const { SlashCommandBuilder } = require('@discordjs/builders');
const { calculateAge } = require('../functions/age-calc');
const { JOJO_DAY, JOJO_MONTH, JOJO_YEAR } = require('./../birthdays.json');
const { SHILOH_DAY, SHILOH_MONTH, SHILOH_YEAR } = require('./../birthdays.json');
const { EZRA_DAY, EZRA_MONTH, EZRA_YEAR } = require('./../birthdays.json');
const { ANDREW_DAY, ANDREW_MONTH, ANDREW_YEAR } = require('./../birthdays.json');
const { CHANEL_DAY, CHANEL_MONTH, CHANEL_YEAR } = require('./../birthdays.json');
const { JAMES_DAY, JAMES_MONTH, JAMES_YEAR } = require('./../birthdays.json');
const { EUNJUNG_DAY, EUNJUNG_MONTH, EUNJUNG_YEAR } = require('./../birthdays.json');
const { CHRIS_DAY, CHRIS_MONTH, CHRIS_YEAR } = require('./../birthdays.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('age')
		.setDescription('Calculates age.')
    .addSubcommand(subcommand =>
      subcommand
      .setName('jojo')
      .setDescription(`Jojo's Age`))
    .addSubcommand(subcommand =>
      subcommand
      .setName('shiloh')
      .setDescription(`Shiloh's Age`))
    .addSubcommand(subcommand =>
      subcommand
      .setName('ezra')
      .setDescription(`Ezra's Age`))
    .addSubcommand(subcommand =>
      subcommand
      .setName('andrew')
      .setDescription(`Andrew's Age`))
    .addSubcommand(subcommand =>
      subcommand
      .setName('chanel')
      .setDescription(`Chanel's Age`))
    .addSubcommand(subcommand =>
      subcommand
      .setName('james')
      .setDescription(`James' Age`))
    .addSubcommand(subcommand =>
      subcommand
      .setName('eunjung')
      .setDescription(`Eunjung's Age`))
    .addSubcommand(subcommand =>
      subcommand
      .setName('chris')
      .setDescription(`Chris' Age`))
		.setDefaultPermission(false),
	async execute(interaction) {
    switch (interaction.options.getSubcommand()) {
      case 'jojo': outputSubcommand(interaction, "Jojo", JOJO_DAY, JOJO_MONTH, JOJO_YEAR); break;
      case 'shiloh': outputSubcommand(interaction, "Shiloh", SHILOH_DAY, SHILOH_MONTH, SHILOH_YEAR); break;
      case 'ezra': outputSubcommand(interaction, "Ezra", EZRA_DAY, EZRA_MONTH, EZRA_YEAR); break;
      case 'andrew': outputSubcommand(interaction, "Andrew", ANDREW_DAY, ANDREW_MONTH, ANDREW_YEAR); break;
      case 'chanel': outputSubcommand(interaction, "Chanel", CHANEL_DAY, CHANEL_MONTH, CHANEL_YEAR); break;
      case 'james': outputSubcommand(interaction, "James", JAMES_DAY, JAMES_MONTH, JAMES_YEAR); break;
      case 'eunjung': outputSubcommand(interaction, "Eunjung", EUNJUNG_DAY, EUNJUNG_MONTH, EUNJUNG_YEAR); break;
      case 'chris': outputSubcommand(interaction, "Chris", CHRIS_DAY, CHRIS_MONTH, CHRIS_YEAR); break;
    }
	},
};

async function outputSubcommand(interaction, name, day, month, year) {
  console.log(`${interaction.user.username} searched ${name}'s age.`);
      const age = calculateAge(day,month,year);
      await interaction.reply({
        content: `${name}'s age is ${age.year} years, ${age.month} months, and ${age.day} days.`,
        ephemeral: true
      });
}