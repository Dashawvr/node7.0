const express = require('express');

const {
    paymentController: {
        getAll,
        
    }
} = require('../controllers');

const router = express.Router();

router.get('/', getAll);
router.post('/', );

module.exports = router
