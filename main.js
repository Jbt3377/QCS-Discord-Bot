// Require DiscordJs
const Discord = require("discord.js");
const client = new Discord.Client();

PREFIX = "!"

// Require Environment Variables
const getProperty = require("./envs/environments.js")

// Require Services
const commandHandler = require('./services/commandService.js')
const pmHandler = require("./services/pmService.js")


client.once("ready", () => {
    console.log("QCS Bot is online");
    console.log(getProperty("SENDGRID_API_KEY"))
});

client.on('guildMemberAdd', member => {

    member.roles.add(member.guild.roles.cache.find(role => role.name === "Awaiting Role"));

    const embed = new Discord.MessageEmbed()
        .setAuthor('QCS Bot | Registration', 'https://imgur.com/mywYsgU.png')
        .setColor(0x039BEF)
        .setTitle("Welcome to the QCS Discord Server!")
        .setDescription("Enter your QUB Email Address below to verify you are a Queen's Student")
        .setFooter("Message should be in the form <student-number>@qub.ac.uk");
    member.send(embed);
 });

client.on("message", message => {

    if(message.author.bot) return;

    if(message.channel.type === "dm"){
        console.log("DM Detected");
        pmHandler(message)
        return;
    }

    if (message.content.startsWith(PREFIX)) commandHandler(message);
});

client.login(getProperty("BOT_TOKEN"));