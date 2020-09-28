const express = require('express');

const {
    userController: {
        create,
        getAll
    }
} = require('../controllers');

const {
    checkFilesValidMiddleware: {
        checkFilesValidMiddleware
    },
    checkUserPhotoMiddleware: {
        checkUserPhotoMiddleware
    },
    userMiddleware: {
        userValidation
    },
} = require('../middleware')

const router = express.Router();


router.get('/', getAll);
router.post('/', userValidation, checkFilesValidMiddleware, checkUserPhotoMiddleware , create);

module.exports = router
