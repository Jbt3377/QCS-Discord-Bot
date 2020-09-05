module.exports = {
    name: "help",
    description: "List of Bot Commands",
    execute(message, args) {
        const Discord = require("discord.js");
        const embed = new Discord.MessageEmbed()
            .setTitle("List of Commands")
            .setColor(0x0000FF)
            .addField("Link to QCS Twitter", "!twitter")
            .addField("Link to QCS Facebook", "!facebook")
            .addField("Link to QCS Instagram", "!instagram")
        message.channel.send(embed);
    }
}