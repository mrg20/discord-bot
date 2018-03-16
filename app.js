//https://discordapp.com/oauth2/authorize?&client_id=423501161925181441&scope=bot&permissions=0
const Discord = require("discord.js");
const client = new Discord.Client();
const photosPath = require("./yuri_photos.json");
const https = require('https');

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

  if(command in photosPath) {
    message.channel.send({file: photosPath[command]});
  }

  if(command === "help"){
    message.channel.send("Yuri nudes:");
    message.channel.send(Object.keys(photosPath));
    message.channel.send("Other shit: ");
    message.channel.send("joke");
  }

  if(command === "joke"){

    https.get('https://api.icndb.com/jokes/random?firstName=Yuri&lastName=ThePUG', (resp) => {
      let data = '';

      // A chunk of data has been recieved.
      resp.on('data', (chunk) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        message.channel.send(JSON.parse(data)['value']['joke']);
      });

    }).on("error", (err) => {
      console.log("Error: " + err.message);
    });
  }
});

client.login(process.env.BOT_TOKEN);
