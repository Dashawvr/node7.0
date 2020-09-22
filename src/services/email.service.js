const mailer = require('nodemailer');
const EmailTemplates = require('email-templates');
const path = require('path');

const htmlTemplates = require('../email-templates');
const { ROOT_EMAIL_PASS, ROOT_EMAIL, FRONTEND_URL } = require('../configs/config');

const emailTemplates = new EmailTemplates({
    message: null,
    views: {
        root: path.join(process.cwd(), 'email-templates')
    }
})

const transporter = mailer.createTransport({
    service: 'gmail',
    auth: {
        user: ROOT_EMAIL,
        pass: ROOT_EMAIL_PASS
    }
});

class EmailService {
    async sendMail(userMail, action, context) {
        try {
            const inform = htmlTemplates[action];
            const html = await emailTemplates.render(inform.templateFileName,
                {...context, frontendUrl: FRONTEND_URL});

            const options = {
                from: 'Car~Shop[NO REPLY]',
                to: userMail,
                subject: inform.subject,
                html
            }

            return transporter.sendMail(options)
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new EmailService()
