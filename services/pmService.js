var sendEmail = require('./emailService');
const Discord = require("discord.js");
const logger = require("../common/logger.js")
const googleSpreadsheetService = require('../services/googleSpreadsheetService.js')
const isQcsMember = googleSpreadsheetService.isQcsMember

const membershipSuccess = new Discord.MessageEmbed()
    .setAuthor('QCS Bot | Membership Validation', 'https://imgur.com/mywYsgU.png')
    .setColor(0x039BEF)
    .setTitle("Membership Confirmed!")
    .setDescription("Congrats! You've been granted the QCS Member role. :tada:")

const membershipFailed = new Discord.MessageEmbed()
.setAuthor('QCS Bot | Membership Validation', 'https://imgur.com/mywYsgU.png')
.setColor(0x039BEF)
.setTitle("Membership Not Found!")
.setDescription("Your Student Number does not match any valid QCS Membership. :notepad_spiral::mag:")
.setFooter("If you think this is incorrect, contact one of our admins.")

function validateQubEmail(emailAddress){

    logger.Debug("Entered Validation")
    
    if(emailAddress.length != 18) return false;

    const QUB_DOMAIN = "@qub.ac.uk";
    const STUDENT_NUMBER_FORMAT = new RegExp(/\d{8}/);

    const studentNumber = emailAddress.substring(0, 8);
    const emailDomain = emailAddress.substring(8).toLowerCase();
    return (studentNumber.match(STUDENT_NUMBER_FORMAT)) && (emailDomain === QUB_DOMAIN)
}

let validateQubStudent = function(message){

    // ToDo: Work out the interactions in Bot PMs

    // Send email if Valid Student Number QUB Email
    if(validateQubEmail(message.content)){
        logger.Debug("Email Validated")
        sendEmail(message.content)

        const embed = new Discord.MessageEmbed()
            .setColor(0x039BEF)
            .setTitle("Email sent!")
            .setDescription("Check your inbox for our email and click the verify button!")
        message.channel.send(embed);

        logger.Debug("Valid Email")

    }else{
        logger.Warn("Invalid Email")

        const embed = new Discord.MessageEmbed()
            .setColor(0x039BEF)
            .setTitle("Invalid QUB Email!")
            .setDescription("If you believe this is incorrect, message one of our admins")
        message.channel.send(embed);
    }
}

let validateMembership = async function(message, client){

    logger.Debug("Entering validateMembership")

    await isQcsMember(message).then(isQcs => {
        if(isQcs){
            const guild = client.guilds.cache.get("734847973166678088")
            const userId = message.author.id
            const member = guild.member(userId)

            if (member.roles.cache.some(role => role.name === 'Awaiting Role')) {
                member.roles.remove(member.guild.roles.cache.find(role => role.name === "Awaiting Role"))
            }

            member.roles.add(member.guild.roles.cache.find(role => role.name === "QCS Member"));

            logger.Info("Membership Validated")
            message.channel.send(membershipSuccess)
        }else{
            logger.Info("Membership Not Confirmed")
            message.channel.send(membershipFailed)
        }
    })

    logger.Debug("Leaving validateMembership")

}

let pmHandler = async function(message, client){

    logger.Debug("Entering pmHandler")

    await validateMembership(message, client)

    logger.Debug("Leaving pmHandler")
}

module.exports = pmHandler