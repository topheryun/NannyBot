const { SlashCommandBuilder } = require('@discordjs/builders');
const { replyAge } = require('../functions/display');
// const { JOJO_DAY, JOJO_MONTH, JOJO_YEAR } = require('./../birthdays.json');
// const { SHILOH_DAY, SHILOH_MONTH, SHILOH_YEAR } = require('./../birthdays.json');
// const { EZRA_DAY, EZRA_MONTH, EZRA_YEAR } = require('./../birthdays.json');
// const { ANDREW_DAY, ANDREW_MONTH, ANDREW_YEAR } = require('./../birthdays.json');
// const { CHANEL_DAY, CHANEL_MONTH, CHANEL_YEAR } = require('./../birthdays.json');
// const { JAMES_DAY, JAMES_MONTH, JAMES_YEAR } = require('./../birthdays.json');
// const { EUNJUNG_DAY, EUNJUNG_MONTH, EUNJUNG_YEAR } = require('./../birthdays.json');
// const { CHRIS_DAY, CHRIS_MONTH, CHRIS_YEAR } = require('./../birthdays.json');
const JOJO_DAY = process.env.JOJO_DAY; const JOJO_MONTH = process.env.JOJO_MONTH; const JOJO_YEAR = process.env.JOJO_YEAR;
const SHILOH_DAY = process.env.SHILOH_DAY; const SHILOH_MONTH = process.env.SHILOH_MONTH; const SHILOH_YEAR = process.env.SHILOH_YEAR;
const EZRA_DAY = process.env.EZRA_DAY; const EZRA_MONTH = process.env.EZRA_MONTH; const EZRA_YEAR = process.env.EZRA_YEAR;
const ANDREW_DAY = process.env.ANDREW_DAY; const ANDREW_MONTH = process.env.ANDREW_MONTH; const ANDREW_YEAR = process.env.ANDREW_YEAR;
const CHANEL_DAY = process.env.CHANEL_DAY; const CHANEL_MONTH = process.env.CHANEL_MONTH; const CHANEL_YEAR = process.env.CHANEL_YEAR;
const JAMES_DAY = process.env.JAMES_DAY; const JAMES_MONTH = process.env.JAMES_MONTH; const JAMES_YEAR = process.env.JAMES_YEAR;
const EUNJUNG_DAY = process.env.EUNJUNG_DAY; const EUNJUNG_MONTH = process.env.EUNJUNG_MONTH; const EUNJUNG_YEAR = process.env.EUNJUNG_YEAR;
const CHRIS_DAY = process.env.CHRIS_DAY; const CHRIS_MONTH = process.env.CHRIS_MONTH; const CHRIS_YEAR = process.env.CHRIS_YEAR;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('age')
		.setDescription('Calculates age.')
    .addSubcommand(subcommand => subcommand.setName('jojo').setDescription(`Jojo's Age`))
    .addSubcommand(subcommand => subcommand.setName('shiloh').setDescription(`Shiloh's Age`))
    .addSubcommand(subcommand => subcommand.setName('ezra').setDescription(`Ezra's Age`))
    .addSubcommand(subcommand => subcommand.setName('andrew').setDescription(`Andrew's Age`))
    .addSubcommand(subcommand => subcommand.setName('chanel').setDescription(`Chanel's Age`))
    .addSubcommand(subcommand => subcommand.setName('james').setDescription(`James' Age`))
    .addSubcommand(subcommand => subcommand.setName('eunjung').setDescription(`Eunjung's Age`))
    .addSubcommand(subcommand => subcommand.setName('chris').setDescription(`Chris' Age`))
		.setDefaultPermission(false),
    
	async execute(interaction) {
    switch (interaction.options.getSubcommand()) {
      case 'jojo': replyAge(interaction, "Jojo", JOJO_DAY, JOJO_MONTH, JOJO_YEAR); break;
      case 'shiloh': replyAge(interaction, "Shiloh", SHILOH_DAY, SHILOH_MONTH, SHILOH_YEAR); break;
      case 'ezra': replyAge(interaction, "Ezra", EZRA_DAY, EZRA_MONTH, EZRA_YEAR); break;
      case 'andrew': replyAge(interaction, "Andrew", ANDREW_DAY, ANDREW_MONTH, ANDREW_YEAR); break;
      case 'chanel': replyAge(interaction, "Chanel", CHANEL_DAY, CHANEL_MONTH, CHANEL_YEAR); break;
      case 'james': replyAge(interaction, "James", JAMES_DAY, JAMES_MONTH, JAMES_YEAR); break;
      case 'eunjung': replyAge(interaction, "Eunjung", EUNJUNG_DAY, EUNJUNG_MONTH, EUNJUNG_YEAR); break;
      case 'chris': replyAge(interaction, "Chris", CHRIS_DAY, CHRIS_MONTH, CHRIS_YEAR); break;
    }
	},
};