const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const photos_path = require("./yuri_photos.json");

client.on("ready", () => {
  console.log(`Bot has started, ${client.guilds.size} guilds.`);
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
  client.user.setActivity(`acariciant el yuri.`);
});

client.on("message", async message => {

  //Ignore other bots. botception.
  if(message.author.bot) return;

  //ignore non prefix message.
  if(message.content.indexOf("+") !== 0) return;

  // Here we separate our "command" name, and our "arguments" for the command.
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(1).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if(command in photos_path) {
    message.channel.send({file: photos_path[command]});
  }
});

client.login(process.env.BOT_TOKEN);
