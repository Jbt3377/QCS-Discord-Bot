// Require DiscordJs
const Discord = require("discord.js");
const client = new Discord.Client();

const PREFIX = "!"

// Require Environment Variables
const getProperty = require("./envs/environments.js")

// Require Services
const commandHandler = require('./services/commandService.js')
const pmHandler = require("./services/pmService.js")
const accessSpreadsheet = require('./services/googleSpreadsheetService.js')

client.once("ready", () => {
    console.log("INFO - QCS Bot is online");
    console.log("INFO - SendGrid API Key: " + getProperty("SENDGRID_API_KEY"))

    const guildID = "734847973166678088"
    const guild = client.guilds.cache.get(guildID)

    guild.members.fetch().then(fetchedMembers => {
        const totalOnline = fetchedMembers.filter(member => member.presence.status === 'online');
        console.log('There are currently ' + totalOnline.size + ' members online in this guild!')

        fetchedMembers.forEach(member => console.log(member.user.username + ' ' + member.id))
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

    console.log("DEBUG - New Message Detected");

    if(message.channel.type === "dm"){
        console.log("DEBUG - Private Message Detected");
        pmHandler(message)
        return;
    }

    if (message.content.startsWith(PREFIX)) commandHandler(message);
});

client.login(getProperty("BOT_TOKEN"));