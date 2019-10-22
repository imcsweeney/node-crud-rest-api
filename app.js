/* eslint-disable no-unused-vars */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// const db = mongoose.connect('mongodb://localhost/bookAPI_prod');

if (process.env.ENV === 'Test') {
  console.log('This is a test');
  const db = mongoose.connect('mongodb://localhost/bookAPI_Test');
} else {
  console.log('This is for real');
  const db = mongoose.connect('mongodb://localhost/bookAPI');
}

const port = process.env.PORT || 3000;
const Book = require('./models/bookModel');
const bookRouter = require('./routes/bookRouter')(Book);


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('welcome to the node jungle');
});

app.server = app.listen(port, () => {
  console.log(`running on port ${port}`);
});
module.exports = app;
