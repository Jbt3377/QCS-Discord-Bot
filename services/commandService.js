const commands = require('../commands/commands.js')

let commandHandler = function(message){

    const args = message.content.slice(PREFIX.length).split(/ +/);
    const command = args.shift().toLowerCase();

    console.log("DEBUG - Command Detected");

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
            console.log("WARN - Invalid Command");
            message.channel.send("Unknown Command. Type !help for a list of commands");
            break;
    }
}

module.exports = commandHandler