const commands = require('../commands/commands.js')

let commandHandler = function(message){

    const args = message.content.slice(PREFIX.length).split(/ +/);

    console.log("DEBUG - args: " + args);

    const command = args.shift().toLowerCase();

    console.log("DEBUG - Command Detected");
    console.log("DEBUG - Command: " + command);

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
            console.log("WARN - Invalid Command");
            message.channel.send("Unknown Command. Type !help for a list of commands");
            break;
    }
}

module.exports = commandHandler