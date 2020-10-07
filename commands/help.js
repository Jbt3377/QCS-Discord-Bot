const Discord = require("discord.js");

let help = function(message, args){

    const embed = new Discord.MessageEmbed()
        .setAuthor('QCS Bot | Help', 'https://imgur.com/mywYsgU.png', 'https://github.com/QCSQUB')
        .setThumbnail('https://imgur.com/mywYsgU.png')
        .setURL('https://github.com/QCSQUB')
        .setColor(0x039BEF)

        .setTitle("List of Commands")
        .addField("QCS Socials", "`!twitter`  `!facebook`  `!instagram`", true)
        .addField("Set your Nickname", "`!setNickname <nickname>`", false)
    message.channel.send(embed);
}

module.exports = help