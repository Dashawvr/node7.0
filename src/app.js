const express = require('express');

const { initDBAssociation } = require('./models');
const { userRouter, authRouter } = require('./routes');

const dotenv = require(`dotenv`);

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/users', userRouter);
app.use('/auth', authRouter);

dotenv.config()

app.use((err, req, res, next) => {
    res.json(
        {
            message: err.message
        }
    )

});

initDBAssociation();

module.exports = app;
