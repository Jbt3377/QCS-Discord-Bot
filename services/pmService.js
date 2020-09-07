var sendEmail = require('./emailService');
const Discord = require("discord.js");

function validateQubEmail(emailAddress){

    console.log("DEBUG - Entered Validation")
    
    if(emailAddress.length != 18) return false;

    const QUB_DOMAIN = "@qub.ac.uk";
    const STUDENT_NUMBER_FORMAT = new RegExp(/\d{8}/);

    const studentNumber = emailAddress.substring(0, 8);
    const emailDomain = emailAddress.substring(8).toLowerCase();
    return (studentNumber.match(STUDENT_NUMBER_FORMAT)) && (emailDomain === QUB_DOMAIN)
}

let pmHandler = function(message){

    // ToDo: Work out the interactions in Bot PMs

    // Send email if Valid Student Number QUB Email
    if(validateQubEmail(message.content)){
        console.log("DEBUG - Email Validated")
        sendEmail(message.content)

        const embed = new Discord.MessageEmbed()
            .setColor(0x039BEF)
            .setTitle("Email sent!")
            .setDescription("Check your inbox for our email and click the verify button!")
        message.channel.send(embed);

        console.log("DEBUG - Valid Email")

    }else{
        console.log("WARN - Invalid Email")

        const embed = new Discord.MessageEmbed()
            .setColor(0x039BEF)
            .setTitle("Invalid QUB Email!")
            .setDescription("If you believe this is incorrect, message one of our admins")
        message.channel.send(embed);
    }
}

module.exports = pmHandler