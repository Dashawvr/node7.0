const express = require('express');
const dotenv = require(`dotenv`);
dotenv.config()

const fileUpload = require('express-fileupload');
const path = require('path');

const { initDBAssociation } = require('./models');
const { userRouter, authRouter } = require('./routes');

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(fileUpload());
app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use(express.static(path.join(process.cwd(), 'src', 'public')))

app.use((err, req, res, next) => {
    res.json(
        {
            message: err.message
        }
    )

});

initDBAssociation();

module.exports = app;
