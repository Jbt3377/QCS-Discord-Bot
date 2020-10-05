const getProperty = require("../common/environments.js")
const logger = require("../common/logger.js")

let sendEmail = function(emailAddress){

    logger.Debug("Entered sendEmail function")

    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(getProperty("SENDGRID_API_KEY"))

    // ToDO: Setup Domain Authentication with QCS website domain
    // Currently Single Sender Verification (emailing yourself for testing)

    const msg = {
        to: 'jbt337733@gmail.com',
        from: 'jbt337733@gmail.com',
        subject: 'Welcome to the QCS Discord!',
        text: 'This is just a simple email to verify you are a QUB student! Student Number!',
        html: '<strong>This is just a simple email to verify you are a QUB student! Student Number!!</strong>',
    }

    sgMail.send(msg).then(() => {
        logger.Debug('Email sent successfully')
    }).catch((error) => {
        logger.Warn('Email failed to send:')
        logger.Error(error)
    });
}

module.exports = sendEmail;
