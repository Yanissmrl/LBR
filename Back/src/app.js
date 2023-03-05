const express = require('express');
const app = express();
const userRouter = require('../request/userRouter');
const newsRouter = require('../request/newsRouter');
const horairesRouter = require('../request/horairesRouter');
app.use('/users', userRouter);
app.use('/news', newsRouter);
app.use('/horaires', horairesRouter);
// const router = require('./router');

// app.use('/users', router);

app.get('/', (req, res) => {
  res.status(200).send('Wecome to Todo List API !');
});

module.exports = app;