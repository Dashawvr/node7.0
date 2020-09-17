const express = require('express');

const {
    userController: {
        create,
        getAll
    }
} = require('../controllers');

const router = express.Router();


router.get('/', getAll)
router.post('/', create)

module.exports = router
