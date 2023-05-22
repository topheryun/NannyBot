const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { CLIENT_ID, GUILD_ID, TOKEN } = require('./config.json');
// const TOKEN = process.env.TOKEN;
// const GUILD_ID = process.env.GUILD_ID;
// const CLIENT_ID = process.env.CLIENT_ID;

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

let printFiles = '[ ';

for (const file of commandFiles) {
	printFiles += `${file}, `;
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

printFiles += ']';
console.log(printFiles);

const rest = new REST({ version: '9' }).setToken(TOKEN);

rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);