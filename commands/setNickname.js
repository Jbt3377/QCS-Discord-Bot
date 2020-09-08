let setNickname = function(message, args){

    if (!message.guild.me.hasPermission('MANAGE_NICKNAMES')) return message.channel.send('I don\'t have permission to change your nickname!');

    var nickname = args[0];
    for(i = 1; i < args.length; i++) nickname = nickname + " " + args[i]

    // ToDO: KNOWN ISSUE - Mising Permissions error when admin attempts to set nickname
    //                     Works for regular users. Investigate this further.

    try{
        message.member.setNickname(nickname)
        message.channel.send('Nickname set!');
        console.log('DEBUG - Nickname set!');
    } catch (error){
        console.log('WARN - Nickname could not be set!');
        console.log(error.message)
    }
}

module.exports = setNickname