const commands = require('../commands/commands.js')
const logger = require("../common/logger.js")

let commandHandler = function(message){

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

        case "setnickname":
            commands.setNickname(message, args);
            break;

        default:
            logger.Warn("Invalid Command");
            message.channel.send("Unknown Command. Type !help for a list of commands");
            break;
    }
}

module.exports = commandHandler