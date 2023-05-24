const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { ROLE_ID, TOKEN } = require('./config.json');
// const TOKEN = process.env.TOKEN;
// const ROLE_ID = process.env.ROLE_ID;

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

process.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error);
});

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

client.once('ready', async () => {
  console.log(`Logged in as ${client.user.tag}. Feed me...`);

	const Guilds = client.guilds.cache.map((guild) => guild);
	const allFetchedCommands = await Guilds[0].commands.fetch();
	fullPermissions = [];

	// console.log(allFetchedCommands);

	allFetchedCommands.forEach(command => {
		const tempCommandId = command.permissions.commandId;
		fullPermissions.push({
			id: tempCommandId,
			permissions: [{
				id: ROLE_ID,
				type: 'ROLE',
				permission: true
			}]
		});
	})

	const permissions2 = {
		id: guild.roles.everyone.id,
		type: 'ROLE',
		permission: false,
	};
	const permissions1 =  {
		id: botRole.id,
		type: 'ROLE',
		permission: true,
	};
	let commandsList = await guild.commands.fetch();
	await commandsList.forEach(slashCommand => {
		console.log(`Changing command ${slashCommand.id}`);
		//set the permissions for each slashCommand
		guild.commands.permissions.add({
				command: slashCommand.id,
				permissions: [permissions1, permissions2]
		});
	});
	// await Guilds[0].commands.permissions.set({ fullPermissions });
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.login(TOKEN);