const getProperty = require("../envs/environments.js")

function validateQubEmail(emailAddress){

    const QUB_DOMAIN = "@qub.ac.uk";
    const STUDENT_NUMBER_FORMAT = new RegExp(/\d{8}/);

    if(emailAddress.length != 18) return false;

    const studentNumber = emailAddress.substring(0, 8);
    const emailDomain = emailAddress.substring(8).toLowerCase();
    return (studentNumber.match(STUDENT_NUMBER_FORMAT)) && (emailDomain === QUB_DOMAIN)
}

function sendEmail(emailAddress){

    // Validation Disabled - Student Number Emails not currently reliable
    if (false) {
        if (!validateQubEmail(emailAddress)) return false;
    }

    const sgMail = require('@sendgrid/mail');
    //sgMail.setApiKey(prop.get("SENDGRID_API_KEY"))
    sgMail.setApiKey(getProperty("SENDGRID_API_KEY"))

    console.log("Ready to send email")

    // "to:" Target email address, any account
    // "from:" Email address of a Verified Single Sender account or Authenticated Domain (See SendGrid Docs)

    const msg = {
        to: emailAddress,
        from: 'beattyjoshua55@gmail.com',
        subject: 'Welcome to the QCS Discord!',
        text: 'This is just a simple email to verify you are a QUB student! Student Number!!',
        html: '<strong>This is just a simple email to verify you are a QUB student! Student Number!!</strong>',
    }

    sgMail.send(msg).then(() => {
        console.log('Message sent')
    }).catch((error) => {
        console.log(error.response.body)
    });
}

const name = "emailService";
module.exports.name = name;
module.exports.sendEmail = sendEmail;
