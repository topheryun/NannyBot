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
		if (interaction.options.getSubcommand() === 'jojo') {
      console.log(`${interaction.user.username} searched Jojo's age.`);
      const age = calculateAge(JOJO_DAY,JOJO_MONTH,JOJO_YEAR)
      await interaction.reply({
        content: `Jojo's age is ${age.year} years, ${age.month} months, and ${age.day} days.`,
        ephemeral: true
      });
    }
	},
};