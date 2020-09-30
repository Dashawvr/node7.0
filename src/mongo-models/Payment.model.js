const { Schema, model } = require('mongoose');

const subSchema = {
    username: {
        type: String,
        ref: 'users'
    },
    email: {
        type: String
    }
}

const PaymentSchema = new Schema({
    currency: {
        type: String,
        require: true
    },
    value: {
        type: Number,
        require: true
    },
    logs: [subSchema]
})

module.exports = model('payments', PaymentSchema);
