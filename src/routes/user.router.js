const express = require('express');

const {
    userController: {
        create,
        getAll
    }
} = require('../controllers');

const {
    checkMiddleware: {
        checkMiddleware
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
router.post('/', userValidation, checkMiddleware, checkUserPhotoMiddleware , create);

module.exports = router
