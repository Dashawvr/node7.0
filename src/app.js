const express = require('express');

const { initDBAssociation } = require('./models');
const { userRouter, authRouter } = require('./routes');

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/users', userRouter);
app.use('/auth', authRouter);

app.use((err, req, res, next) => {
    res.json(
        {
            message: err.message
        }
    )

});

initDBAssociation();

module.exports = app;
