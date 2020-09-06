// Require DiscordJs
const Discord = require("discord.js");
const client = new Discord.Client();

PREFIX = "!"

// Require Environment Variables
const getProperty = require("./envs/environments.js")

// Require Services
const commands = require('./services/commandService.js')
const sendEmail = require("./services/emailService.js")


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
        sendEmail(message.content);
        return;
    }

    if (message.content.startsWith(PREFIX)) checkForCommand(message);
});


function checkForCommand(message){

    const args = message.content.slice(PREFIX.length).split(/ +/);
    const command = args.shift().toLowerCase();

    switch(command){
        case "facebook":
            commands.facebook(message, args);
            break;

        case "twitter":
            commands.twitter(message, args);
            break;

        case "instagram":
            commands.instagram(message, args);
            break;

        case "help":
            commands.help(message, args);
            break;

        default:
            message.channel.send("Unknown Command. Type !help for a list of commands");
            break;
    }
}

client.login(getProperty("BOT_TOKEN"));