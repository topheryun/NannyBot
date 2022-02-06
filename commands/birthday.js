const { SlashCommandBuilder } = require('@discordjs/builders');
const { displayBirthday, replyBirthday, replyMultiBirthday } = require('./../functions/display');
const { JOJO_DAY, JOJO_MONTH, JOJO_YEAR } = require('./../birthdays.json');
const { SHILOH_DAY, SHILOH_MONTH, SHILOH_YEAR } = require('./../birthdays.json');
const { EZRA_DAY, EZRA_MONTH, EZRA_YEAR } = require('./../birthdays.json');
const { ANDREW_DAY, ANDREW_MONTH, ANDREW_YEAR } = require('./../birthdays.json');
const { CHANEL_DAY, CHANEL_MONTH, CHANEL_YEAR } = require('./../birthdays.json');
const { JAMES_DAY, JAMES_MONTH, JAMES_YEAR } = require('./../birthdays.json');
const { EUNJUNG_DAY, EUNJUNG_MONTH, EUNJUNG_YEAR } = require('./../birthdays.json');
const { CHRIS_DAY, CHRIS_MONTH, CHRIS_YEAR } = require('./../birthdays.json');

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