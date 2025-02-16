const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 9000;

// Connection
const uri = process.env.MONGO_DB_CONNECTION_URI;

mongoose.connect(uri)
  .then(() => {
    console.log("MongoDB Connected Successfully!!!");
  }).catch((error) => {
    console.error("Error connecting MongoDB", error);
  });

// Setting up path and view engine
app.set("view engine", "ejs");
app.set("views", path.resolve('./views'));
app.use(express.static(path.resolve('./assets')));
app.use(express.static(path.resolve('./scripts')));
app.use(express.static(path.resolve('./public')));

// Middlewares
const { logReqRes } = require('./middlewares/log');
const { checkAuthCookie } = require('./middlewares/authentication');

app.use(logReqRes("log.txt"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(checkAuthCookie("token"));

// Routing
const staticRouter = require('./routes/index');
const userRouter = require('./routes/user');
const blogRouter = require('./routes/blog');
const profileRouter = require('./routes/profile');
const otpRouter = require('./routes/otp');

app.use('/', staticRouter);
app.use('/user', userRouter);
app.use('/blog', blogRouter);
app.use('/profile', profileRouter);
app.use('/otp', otpRouter);

app.listen(PORT, (error) => {
    if(error){
        console.log("Error connecting with server", error);
    }
    else{
        console.log(`Server is listening on port -> ${PORT}`);
        console.log(`\n\nhttp://localhost:${PORT}\n\n`);
    }
})