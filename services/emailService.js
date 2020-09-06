const getProperty = require("../envs/environments.js")

let sendEmail = function(emailAddress){

    console.log("Entered sendEmail fucntion")

    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(getProperty("SENDGRID_API_KEY"))

    // ToDO: Setup Domain Authentication with QCS website domain

    const msg = {
        to: emailAddress,
        from: 'beattyjoshua55@gmail.com',
        subject: 'Welcome to the QCS Discord!',
        text: 'This is just a simple email to verify you are a QUB student! Student Number!!',
        html: '<strong>This is just a simple email to verify you are a QUB student! Student Number!!</strong>',
    }

    sgMail.send(msg).then(() => {
        console.log('Email sent successfully')
    }).catch((error) => {
        console.log('Email failed to send:')
        console.log(error.response.body)
    });
}

module.exports = sendEmail;
