const emailAction = require('../configs/email-action.enam');

module.exports = {
    [emailAction.WELCOME]: {
        subject: '[Car~Shop] Welcome',
        templateFileName: 'welcome'
    },

    [emailAction.FORGOT_PASS]: {
        subject: '[Car~Shop] Some problems with Password!',
        templateFileName: 'forgot-pass'
    },

    [emailAction.LOG_OUT]: {
        subject: '[Car~Shop] User log out',
        templateFileName: 'log-out'
    }
}
