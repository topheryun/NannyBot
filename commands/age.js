const { SlashCommandBuilder } = require('@discordjs/builders');

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
      
    }
	},
};