const logger = require("../common/logger.js")

let setNickname = function(message, args){

    if (message.author.id === message.guild.ownerID) return message.reply('I can\'t change the Guild Owner\'s nickname.');

    var nickname = args[0];
    for(i = 1; i < args.length; i++) nickname = nickname + " " + args[i]

    try{
        message.member.setNickname(nickname)

        message.reply('Nickname set!');
        logger.Debug('Nickname set!');
    } catch (error){
        message.reply('Nickname could not be set.');
        logger.Warn('Nickname could not be set.');
        logger.Error(error.message)
    }
}

module.exports = setNickname