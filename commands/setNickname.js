let setNickname = function(message, args){

    if (message.author.id === message.guild.ownerID) return message.reply('I can\'t change the Guild Owner\'s nickname.');

    var nickname = args[0];
    for(i = 1; i < args.length; i++) nickname = nickname + " " + args[i]

    try{
        message.member.setNickname(nickname)

        message.reply('Nickname set!');
        console.log('INFO - Nickname set!');
    } catch (error){
        message.reply('Nickname could not be set.');
        console.log('WARN - Nickname could not be set.');
        console.log(error.message)
    }
}

module.exports = setNickname