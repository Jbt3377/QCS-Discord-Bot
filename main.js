// Require DiscordJs
const Discord = require("discord.js");
const client = new Discord.Client();

const PREFIX = "!";

// Require Command and Service files
const fs = require("fs");

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync("./commands/").filter(file => file.endsWith(".js"));

client.services = new Discord.Collection();
const serviceFiles = fs.readdirSync("./services/").filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`)
    client.commands.set(command.name, command);
}

for (const file of serviceFiles) {
    const service = require(`./services/${file}`)
    client.services.set(service.name, service);
}

// Property Reader
// const PropertiesReader = require('properties-reader');
// const prop = PropertiesReader('./bot.properties');
// getProperty = (pty) => {return prop.get(pty);}

const getProperty = require("./envs/environments.js")


client.once("ready", () => {
    console.log("QCS Bot is online");
    console.log(getProperty("SENDGRID_API_KEY"))
});

client.on('guildMemberAdd', member => {
    const embed = new Discord.MessageEmbed()
        .setTitle("Welcome to the QCS Discord Server!")
        .setColor(0x039BEF)
        .setDescription("Enter your QUB Email Address below to verify your membership")
        .setFooter("Message should be in the form <student-number>@qub.ac.uk");
    member.send(embed);
 });

client.on("message", message => {

    if(message.author.bot) return;

    if(message.channel.type === "dm"){
        console.log("DM Detected");
        client.services.get("emailService").sendEmail(message.content);
        return;
    }

    if (message.content.startsWith(PREFIX)) checkForCommand(message);
});


function checkForCommand(message){

    const args = message.content.slice(PREFIX.length).split(/ +/);
    const command = args.shift().toLowerCase();

    switch(command){
        case "twitter":
            client.commands.get("twitter").execute(message, args);
            break;

        case "facebook":
            client.commands.get("facebook").execute(message, args);
            break;

        case "instagram":
            client.commands.get("instagram").execute(message, args);
            break;

        case "help":
            client.commands.get("help").execute(message, args);
            break;

        default:
            message.channel.send("Unknown Command. Type !help for a list of commands");
            break;
    }
}

client.login(getProperty("BOT_TOKEN"));