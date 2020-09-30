const express = require('express');
const dotenv = require(`dotenv`);
const fileUpload = require('express-fileupload');
const path = require('path');

dotenv.config()

const {initDBAssociation} = require('./models');
const {userRouter, authRouter} = require('./routes');

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(fileUpload());
app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use(express.static(path.join(process.cwd(), 'public')))

app.use((err, req, res, next) => {
    res.json(
        {
            message: err.message
        }
    )

});

initDBAssociation();

module.exports = app;
