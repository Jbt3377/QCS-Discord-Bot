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

    // Validation 
    // if (!validateQubEmail(emailAddress)) return false;

    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(getProperty("SENDGRID_API_KEY"))

    console.log("Ready to send email")

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

module.exports.sendEmail = sendEmail;
