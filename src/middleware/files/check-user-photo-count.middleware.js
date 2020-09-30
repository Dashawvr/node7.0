const {ErrorHandler, statusCode, errors} = require('../../errors');
module.exports = (req, res, next) => {
    try {
        if (!req.photos) {
            return next()
        }
        if (req.photos.length > 1) {
            return next(new ErrorHandler(
                statusCode.BAD_REQUEST,
                errors.BAD_REQUEST_TOO_MANY_PHOTOS.code));
        }
        console.log(';', req.photos);
        req.avatar = req.photos[0];
        next();
    } catch (e) {
        next(e);
    }

}
