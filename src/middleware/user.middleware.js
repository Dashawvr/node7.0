const { ErrorHandler, errors, statusCode } = require('../errors');
const { userValidator: { userValidator }} = require('../validators');

    module.exports = {
    userValidation: async (req, res, next) => {
        try {
            const user = req.body;
            const { error } = await userValidator.validate(user);

            if (error) {
                return next(new ErrorHandler(
                    error.details[0].message,
                    statusCode.BAD_REQUEST,
                    errors.BAD_REQUEST_NO_USER.code))
            };
            next();
        } catch (e) {
            next(e);
        }

    }
}
