const express = require('express');

const {
    userController: {
        create,
        getAll
    },
    authController: {
        login,
        logout
    }
} = require('../controllers');

const {
    authMiddleware: {
        checkIsUserRegistered,
        checkUserPassword,
        checkAccessToken
    }
} = require('../middleware');

const router = express.Router();


router.post('/login', checkIsUserRegistered, checkUserPassword, login);
router.post('/logout', checkAccessToken, logout);
// router.post('/', create)

module.exports = router
