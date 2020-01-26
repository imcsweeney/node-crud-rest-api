/* eslint-disable no-unused-vars */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const path = require('path');

const app = express();

// const db = mongoose.connect('mongodb://localhost/bookAPI_prod');
// connect to MongoDB

let db = {};

if (process.env.ENV === 'Test') {
  console.log('TESTING...connecting to the test DB');
  db = mongoose.connect('mongodb://localhost/bookAPI_Test');
} else {
  console.log('THINK FIRST...connecting to the production DB');
  db = mongoose.connect('mongodb://localhost/bookAPI');
}
db = mongoose.connection;

// handle mongo error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  // we're connected!
});

const port = process.env.PORT || 3000;
const Book = require('./models/bookModel');
const User = require('./models/user');
const bookRouter = require('./routes/bookRouter')(Book);
const userRouter = require('./routes/userRouter')(User);

// use sessions for tracking logins
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', bookRouter);
app.use('/', userRouter);


// GET route for reading data
// app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/templateLogReg/index.html')));

app.server = app.listen(port, () => {
  console.log(`running on port ${port}`);
});
module.exports = app;
