// Require DiscordJs
const Discord = require("discord.js");
const client = new Discord.Client();

// Require Services
const getProperty = require("./common/environments.js")
const commandHandler = require('./services/commandService.js')
const pmHandler = require("./services/pmService.js")
const logger = require("./common/logger.js")
const googleSpreadsheetService = require('./services/googleSpreadsheetService.js')
const accessSpreadsheet = googleSpreadsheetService.accessSpreadsheet

const PREFIX = "!"


client.once("ready", () => {
    logger.Info("QCS Bot Online")
    const guild = client.guilds.cache.get("734847973166678088")

    guild.members.fetch().then(fetchedMembers => {
        logger.Info('There are a total of ' + fetchedMembers.size + ' members in this guild')
        const totalOnline = fetchedMembers.filter(member => member.presence.status === 'online');
        logger.Info('There are currently ' + totalOnline.size + ' members online!')
    });

    accessSpreadsheet()
});

client.on('guildMemberAdd', member => {

    member.roles.add(member.guild.roles.cache.find(role => role.name === "Awaiting Role"));

    const embed = new Discord.MessageEmbed()
        .setAuthor('QCS Bot | Welcome Guide', 'https://imgur.com/mywYsgU.png')
        .setColor(0x039BEF)
        .setTitle("Welcome to the QCS Discord Server! :partying_face::tada:")
        .addField("Roles", "Head over to #:id:get-roles and add a reaction to give yourself roles.")
        .addField("Access", "Make sure to select your student type to gain access to the rest of the server :closed_lock_with_key:")
        .addField("Membership", "Type your Student Number below if you have a QCS Membership to gain the QCS Member Role! :arrow_down:")
    member.send(embed);
 });

client.on("message", message => {

    if(message.author.bot) return;

    logger.Debug("New Message Detected");

    // Check and Handle Private Message
    if(message.channel.type === "dm"){
        logger.Debug("Private Message Detected");
        pmHandler(message, client)
        return;
    }

    // Chech and Handle Server Command
    logger.Debug("Command Detected");
    if (message.content.startsWith(PREFIX)) commandHandler(message);
});

client.login(getProperty("BOT_TOKEN"));