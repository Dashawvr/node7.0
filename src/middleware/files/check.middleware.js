const { MAX_DOC_SIZE, MAX_PHOTO_SIZE, DOCS_MIMETYPES, PHOTO_MIMETYPES } = require('../../configs/constants');

module.exports = (req, res, next) => {
    try {
        if (!req.files) {
            return next();
        }
        const photos = [];
        const docs = [];

        const files = Object.values(req.files)

        for (let i = 0; i < files.length; i++) {
            const {size, name, mimetype} = files[i];

            if (PHOTO_MIMETYPES.includes(mimetype)) {

                if (size > MAX_PHOTO_SIZE) {
                    return next(new Error('Very big Size'))
                }

                photos.push(files[i]);
            } else if (DOCS_MIMETYPES.includes(mimetype)) {

                if (size > MAX_DOC_SIZE) {
                    return next(new Error('Very big Size'))
                }

                files.push(files[i]);
            } else {
                return next(new Error(`Not valid file ${name}`))
            }

            req.photos = photos;
            req.docs = docs;
            next();
        }

    } catch (e) {
        next(e);
    }
}
