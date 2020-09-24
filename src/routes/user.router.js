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
    userMiddleware: {
        userValidation
    }
} = require('../middleware')

const router = express.Router();


router.get('/', getAll);
router.post('/', userValidation, checkMiddleware, create);

module.exports = router
