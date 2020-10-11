let memberCount = function(message){

    message.guild.members.fetch().then(fetchedMembers => {
        message.channel.send("There are a total of " + fetchedMembers.size + " members on the QCS Discord! :chart_with_upwards_trend: :tada:")
    });
}

module.exports = memberCount