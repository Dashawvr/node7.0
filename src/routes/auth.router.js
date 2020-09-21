const express = require('express');

const {
    userController: {
        create,
        getAll
    },
    authController: {
        login,
        logout,
        refreshToken
    }
} = require('../controllers');

const {
    authMiddleware: {
        checkIsUserRegistered,
        checkUserPassword,
        checkAccessToken,
        checkRefreshToken
    }
} = require('../middleware');

const router = express.Router();


router.post('/login', checkIsUserRegistered, checkUserPassword, login);
router.post('/logout', checkAccessToken, logout);
router.post('/refresh', checkRefreshToken, refreshToken);

module.exports = router
