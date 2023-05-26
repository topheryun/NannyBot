const { SlashCommandBuilder } = require('@discordjs/builders');
const { displayBirthday, replyBirthday, replyMultiBirthday } = require('../../functions/display');
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

const JOJO = { name: 'Jojo', day: JOJO_DAY, month: JOJO_MONTH, year: JOJO_YEAR };
const SHILOH = { name: "Shiloh", day: SHILOH_DAY, month: SHILOH_MONTH, year: SHILOH_YEAR };
const EZRA = { name: 'Ezra', day: EZRA_DAY, month: EZRA_MONTH, year: EZRA_YEAR };
const ANDREW = { name: 'Andrew', day: ANDREW_DAY, month: ANDREW_MONTH, year: ANDREW_YEAR };
const CHANEL = { name: 'Chanel', day: CHANEL_DAY, month: CHANEL_MONTH, year: CHANEL_YEAR };
const JAMES = { name: 'James', day: JAMES_DAY, month: JAMES_MONTH, year: JAMES_YEAR };
const EUNJUNG = { name: 'Eunjung', day: EUNJUNG_DAY, month: EUNJUNG_MONTH, year: EUNJUNG_YEAR };
const CHRIS = { name: 'Chris', day: CHRIS_DAY, month: CHRIS_MONTH, year: CHRIS_YEAR };

module.exports = {
	data: new SlashCommandBuilder()
		.setName('bday')
		.setDescription('Birthdays')
    .addSubcommand(subcommand => subcommand.setName('all').setDescription(`Everyone's Birthday`))
    .addSubcommand(subcommand => subcommand.setName('kids').setDescription(`Children's Birthday`))
    .addSubcommand(subcommand => subcommand.setName('jojo').setDescription(`Jojo's Birthday`))
    .addSubcommand(subcommand => subcommand.setName('shiloh').setDescription(`Shiloh's Birthday`))
    .addSubcommand(subcommand => subcommand.setName('ezra').setDescription(`Ezra's Birthday`))
    .addSubcommand(subcommand => subcommand.setName('andrew').setDescription(`Andrew's Birthday`))
    .addSubcommand(subcommand => subcommand.setName('chanel').setDescription(`Chanel's Birthday`))
    .addSubcommand(subcommand => subcommand.setName('james').setDescription(`James' Birthday`))
    .addSubcommand(subcommand => subcommand.setName('eunjung').setDescription(`Eunjung's Birthday`))
    .addSubcommand(subcommand => subcommand.setName('chris').setDescription(`Chris' Birthday`))
		.setDefaultPermission(false),

	async execute(interaction) {
    if (interaction.options.getSubcommand() === 'all') {
      console.log(`${interaction.user.username} searched for everyone's birthdays.`);
      await interaction.reply({
        content: 
        `Jojo's Birthday: ` + displayBirthday(JOJO_DAY,JOJO_MONTH,JOJO_YEAR) + '\n' +
        `Shiloh's Birthday: ` + displayBirthday(SHILOH_DAY,SHILOH_MONTH,SHILOH_YEAR) + '\n' +
        `Ezra's Birthday: ` + displayBirthday(EZRA_DAY,EZRA_MONTH,EZRA_YEAR) + '\n' +
        `Andrew's Birthday: ` + displayBirthday(ANDREW_DAY,ANDREW_MONTH,ANDREW_YEAR) + '\n' +
        `Chanel's Birthday: ` + displayBirthday(CHANEL_DAY,CHANEL_MONTH,CHANEL_YEAR) + '\n' +
        `James' Birthday: ` + displayBirthday(JAMES_DAY,JAMES_MONTH,JAMES_YEAR) + '\n' +
        `Eunjung's Birthday: ` + displayBirthday(EUNJUNG_DAY,EUNJUNG_MONTH,EUNJUNG_YEAR) + '\n' +
        `Chris' Birthday: ` + displayBirthday(CHRIS_DAY,CHRIS_MONTH,CHRIS_YEAR) + '\n',
        ephemeral: true
      });
    }
    else if (interaction.options.getSubcommand() === 'kids') {
      console.log(`${interaction.user.username} searched for the kids' birthdays.`);
      const people = [ JOJO, SHILOH, EZRA ];
      replyMultiBirthday(interaction, people);
      // await interaction.reply({
      //   content: 
      //   `Jojo's Birthday: ` + displayBirthday(JOJO_DAY,JOJO_MONTH,JOJO_YEAR) + '\n' +
      //   `Shiloh's Birthday: ` + displayBirthday(SHILOH_DAY,SHILOH_MONTH,SHILOH_YEAR) + '\n' +
      //   `Ezra's Birthday: ` + displayBirthday(EZRA_DAY,EZRA_MONTH,EZRA_YEAR),
      //   ephemeral: true
      // });
    }
    else if (interaction.options.getSubcommand() === 'jojo')
      replyBirthday(interaction, JOJO);
    else if (interaction.options.getSubcommand() === 'shiloh')
      replyBirthday(interaction, SHILOH);
    else if (interaction.options.getSubcommand() === 'ezra')
      replyBirthday(interaction, EZRA);
    else if (interaction.options.getSubcommand() === 'andrew')
      replyBirthday(interaction, ANDREW);
    else if (interaction.options.getSubcommand() === 'chanel')
      replyBirthday(interaction, CHANEL);
    else if (interaction.options.getSubcommand() === 'james') 
      replyBirthday(interaction, JAMES);
    else if (interaction.options.getSubcommand() === 'eunjung') 
      replyBirthday(interaction, EUNJUNG);
    else if (interaction.options.getSubcommand() === 'chris') 
      replyBirthday(interaction, CHRIS);
	},
};