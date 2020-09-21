const Joi = require('joi');
const {EMAIL} = require('../../configs/regexp.enam');

module.exports = Joi.object().keys({
    name: Joi.string().alphanum().trim().min(2).max(50).required(),
    email: Joi.string().email().regex(EMAIL).max(50).required(),
    password: Joi.string().trim().min(8).required()
})
