const Discord = require("discord.js");

let help = function(message, args){

    const embed = new Discord.MessageEmbed()
        .setAuthor('QCS Bot', 'https://imgur.com/mywYsgU.png', 'https://github.com/QCSQUB')
        .setThumbnail('https://imgur.com/mywYsgU.png')
        .setURL('https://github.com/QCSQUB')
        .setColor(0x039BEF)

        .setTitle("List of Commands")
        .addField("Links to QCS Socials", "`!twitter`  `!facebook`  `!instagram`", true)
    message.channel.send(embed);
}

module.exports = help