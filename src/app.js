const express = require('express');
const dotenv = require(`dotenv`);
dotenv.config()
const mongoose = require('mongoose');

const fileUpload = require('express-fileupload');
const path = require('path');

const { initDBAssociation } = require('./models');
const { userRouter, authRouter, paymentRouter } = require('./routes');

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(fileUpload());
app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/payment', paymentRouter);
app.use(express.static(path.join(process.cwd(), 'src', 'public')))

mongoose.connect(encodeURI( 'mongodb://localhost/nodeJS'), {useNewUrlParser: true});
const dataBase = mongoose.connection;
dataBase.on('error', (args) => {
    console.log(args);
})

app.use((err, req, res, next) => {
    res.json(
        {
            message: err.message
        }
    )
});

initDBAssociation();

module.exports = app;
