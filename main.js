// Require DiscordJs
const Discord = require("discord.js");
const client = new Discord.Client();

// Require Services
const getProperty = require("./common/environments.js")
const logger = require("./common/logger.js")
const commandHandler = require('./services/commandService.js')
const pmHandler = require("./services/pmService.js")
const googleSpreadsheetService = require('./services/googleSpreadsheetService.js')
const accessSpreadsheet = googleSpreadsheetService.accessSpreadsheet

const PREFIX = "!"


client.once("ready", () => {
    logger.Info("QCS Bot Online")
    logger.Info("SendGrid API Key: " + getProperty("SENDGRID_API_KEY"))

    const guild = client.guilds.cache.get("734847973166678088")

    guild.members.fetch().then(fetchedMembers => {
        const totalOnline = fetchedMembers.filter(member => member.presence.status === 'online');
        logger.Info('There are currently ' + totalOnline.size + ' members online in this guild!')
    });

    accessSpreadsheet()
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

    logger.Debug("New Message Detected");

    if(message.channel.type === "dm"){
        logger.Debug("Private Message Detected");
        pmHandler(message, client)
        return;
    }

    if (message.content.startsWith(PREFIX)) commandHandler(message);
});

client.login(getProperty("BOT_TOKEN"));