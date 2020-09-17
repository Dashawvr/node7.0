const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

const {userService} = require('../services');

module.exports = {
    checkIsUserRegistered: async (req, res, next) => {
        const {email} = req.body;

        if (!email) {
            return next(new Error('bad params'))
        }

        const user = await userService.getByEmail(email);

        console.log(user);

        if (!user) {
            return next(new Error('user not found'))
        }

        req.user = user
        next()
    },
    checkUserPassword: async (req, res, next) => {
        const {password: hashPassword} = req.user;
        const {password} = req.body;

        const isEqualPass = await bcrypt.compare(password, hashPassword);

        if (!isEqualPass) {
            return next(new Error('wrong password'))
        }

        next();
    },

    checkAccessToken: async (req, res, next) => {
        const access_token = req.get('Authorization');

        if (!access_token) {
            return next(new Error('token not found'))
        }

        jsonwebtoken.verify(access_token, 'HelloThere', err => {
            if (err) {
                return next(new Error('Token is not valid'));
            }
        });

        const user = await userService.getByAccessToken(access_token);

        req.access_token = access_token;
        req.authUser = user;
        next();
    }
}
