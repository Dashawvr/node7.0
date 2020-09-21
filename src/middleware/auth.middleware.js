const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

const { userService, authService } = require('../services');
const { ErrorHandler, errors, statusCode } = require('../errors');
const { AUTHORIZATION } = require('../configs/constants');

module.exports = {
    checkIsUserRegistered: async (req, res, next) => {
        try {
            const { email } = req.body;

            if (!email) {
                return next(new ErrorHandler(
                    statusCode.UNAUTHORIZED,
                    errors.BAD_REQUEST_BAD_PARAMS.code))
            }

            const user = await userService.getByEmail(email);

            console.log(user);

            if (!user) {
                return next(new ErrorHandler(
                    statusCode.NOT_FOUND,
                    errors.NOT_FOUND_PERSON.code))
            }

            req.user = user
            next()
        } catch (e) {
            next(e);
        }
    },
    checkUserPassword: async (req, res, next) => {
        try {
            const { password: hashPassword } = req.user;
            const { password } = req.body;

            const isEqualPass = await bcrypt.compare(password, hashPassword);

            if (!isEqualPass) {
                return next(new ErrorHandler(
                    statusCode.BAD_REQUEST,
                    errors.BAD_REQUEST_WRONG_PASS.code))
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkAccessToken: async (req, res, next) => {
        try {
            const access_token = req.get(AUTHORIZATION);

            if (!access_token) {
                return next(new ErrorHandler(
                    statusCode.BAD_REQUEST,
                    errors.BAD_REQUEST_NO_TOKEN.code))
            }

            jsonwebtoken.verify(access_token, 'HelloThere', err => {
                if (err) {
                    return next(new ErrorHandler(
                        statusCode.BAD_REQUEST,
                        errors.BAD_REQUEST_NOT_VALID_TOKEN.code));
                }
            });

            const user = await userService.getByAccessToken(access_token);

            req.access_token = access_token;
            req.authUser = user;
            next();
        } catch (e) {
            next(e);
        }
    },

    checkRefreshToken: async (req, res, next) => {
        try {
            const refresh_token = req.get(AUTHORIZATION);

            if (!refresh_token) {
                return next(new ErrorHandler(
                    statusCode.BAD_REQUEST,
                    errors.BAD_REQUEST_NO_TOKEN.code))
            }

            jsonwebtoken.verify(refresh_token, 'another_secret_Token@', err => {
                if (err) {
                    return next(new ErrorHandler(
                        statusCode.BAD_REQUEST,
                        errors.BAD_REQUEST_NOT_VALID_TOKEN.code));
                }
            });

            const token = await userService.getByRefreshToken(refresh_token);

            if (!token) {
                return next(new ErrorHandler(
                    statusCode.BAD_REQUEST,
                    errors.BAD_REQUEST_NOT_VALID_TOKEN.code))
            }

            req.refresh_token = refresh_token;
            req.authUser = token;
            next();

        } catch (e) {
            next(e);
        }
    }
}
