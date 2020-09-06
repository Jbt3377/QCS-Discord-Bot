var sendEmail = require('./emailService')

function validateQubEmail(emailAddress){

    const QUB_DOMAIN = "@qub.ac.uk";
    const STUDENT_NUMBER_FORMAT = new RegExp(/\d{8}/);

    if(emailAddress.length != 18) return false;

    const studentNumber = emailAddress.substring(0, 8);
    const emailDomain = emailAddress.substring(8).toLowerCase();
    return (studentNumber.match(STUDENT_NUMBER_FORMAT)) && (emailDomain === QUB_DOMAIN)
}

let pmService = function(message){

    // ToDo: Work out the interactions in Bot PMs

    // Send email if Valid Student Number QUB Email
    if(validateQubEmail(message)){
        sendEmail(message)
    }
}

module.exports = pmService