const { SlashCommandBuilder } = require('@discordjs/builders');
const { displayBirthday } = require('./../functions/birthday-display');
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
		.setName('bday')
		.setDescription('Birthdays')
    .addSubcommand(subcommand =>
      subcommand
      .setName('all')
      .setDescription(`Everyone's Birthday`))
    .addSubcommand(subcommand =>
      subcommand
      .setName('kids')
      .setDescription(`Children's Birthday`))
    .addSubcommand(subcommand =>
      subcommand
      .setName('jojo')
      .setDescription(`Jojo's Birthday`))
    .addSubcommand(subcommand =>
      subcommand
      .setName('shiloh')
      .setDescription(`Shiloh's Birthday`))
    .addSubcommand(subcommand =>
      subcommand
      .setName('ezra')
      .setDescription(`Ezra's Birthday`))
    .addSubcommand(subcommand =>
      subcommand
      .setName('andrew')
      .setDescription(`Andrew's Birthday`))
    .addSubcommand(subcommand =>
      subcommand
      .setName('chanel')
      .setDescription(`Chanel's Birthday`))
    .addSubcommand(subcommand =>
      subcommand
      .setName('james')
      .setDescription(`James' Birthday`))
    .addSubcommand(subcommand =>
      subcommand
      .setName('eunjung')
      .setDescription(`Eunjung's Birthday`))
    .addSubcommand(subcommand =>
      subcommand
      .setName('chris')
      .setDescription(`Chris' Birthday`))
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
      await interaction.reply({
        content: 
        `Jojo's Birthday: ` + displayBirthday(JOJO_DAY,JOJO_MONTH,JOJO_YEAR) + '\n' +
        `Shiloh's Birthday: ` + displayBirthday(SHILOH_DAY,SHILOH_MONTH,SHILOH_YEAR) + '\n' +
        `Ezra's Birthday: ` + displayBirthday(EZRA_DAY,EZRA_MONTH,EZRA_YEAR),
        ephemeral: true
      });
    }
    else if (interaction.options.getSubcommand() === 'jojo') {
      console.log(`${interaction.user.username} searched for Jojo's birthday.`);
      await interaction.reply({content: `Jojo's Birthday: ` + displayBirthday(JOJO_DAY,JOJO_MONTH,JOJO_YEAR), ephemeral: true});
    }
    else if (interaction.options.getSubcommand() === 'shiloh') {
      console.log(`${interaction.user.username} searched for Shiloh's birthday.`);
      await interaction.reply({content: `Shiloh's Birthday: ` + displayBirthday(SHILOH_DAY,SHILOH_MONTH,SHILOH_YEAR), ephemeral: true});
    }
    else if (interaction.options.getSubcommand() === 'ezra') {
      console.log(`${interaction.user.username} searched for Ezra's birthday.`);
      await interaction.reply({content: `Ezra's Birthday: ` + displayBirthday(EZRA_DAY,EZRA_MONTH,EZRA_YEAR), ephemeral: true});
    }
    else if (interaction.options.getSubcommand() === 'andrew') {
      console.log(`${interaction.user.username} searched for Andrew's birthday.`);
      await interaction.reply({content: `Andrew's Birthday: ` + displayBirthday(ANDREW_DAY,ANDREW_MONTH,ANDREW_YEAR), ephemeral: true});
    }
    else if (interaction.options.getSubcommand() === 'chanel') {
      console.log(`${interaction.user.username} searched for Chanel's birthday.`);
      await interaction.reply({content: `Chanel's Birthday: ` + displayBirthday(CHANEL_DAY,CHANEL_MONTH,CHANEL_YEAR), ephemeral: true});
    }
    else if (interaction.options.getSubcommand() === 'james') {
      console.log(`${interaction.user.username} searched for James' birthday.`);
      await interaction.reply({content: `James' Birthday: ` + displayBirthday(JAMES_DAY,JAMES_MONTH,JAMES_YEAR), ephemeral: true});
    }
    else if (interaction.options.getSubcommand() === 'eunjung') {
      console.log(`${interaction.user.username} searched for Eunjung's birthday.`);
      await interaction.reply({content: `Eunjung's Birthday: ` + displayBirthday(EUNJUNG_DAY,EUNJUNG_MONTH,EUNJUNG_YEAR), ephemeral: true});
    }
    else if (interaction.options.getSubcommand() === 'chris') {
      console.log(`${interaction.user.username} searched for Chris' birthday.`);
      await interaction.reply({content: `Chris' Birthday: ` + displayBirthday(CHRIS_DAY,CHRIS_MONTH,CHRIS_YEAR), ephemeral: true});
    }
    else return;
	},
};
