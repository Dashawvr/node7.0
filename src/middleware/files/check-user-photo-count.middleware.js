const { ErrorHandler, statusCode, errors } = require('../../errors');
module.exports = (req, res, next) => {
    try {
        if (!req.photos) {
            return next()
        }
        if (req.photos > 1) {
            return next (new ErrorHandler(
                statusCode.BAD_REQUEST,
                errors.BAD_REQUEST_TOO_MANY_PHOTOS.code));
        }

        req.avatar = req.photos[0];
        next();
    } catch (e) {
        next(e);
    }

}
