module.exports = (req, res, next) => {
    try {
        if (req.photos > 1) {
            return next (new Error('Please upload one photo'));
        }
    } catch (e) {
        next(e);
    }

}
