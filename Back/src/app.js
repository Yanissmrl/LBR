const express = require('express');
const app = express();
const userRouter = require('../request/userRouter');
const newsRouter = require('../request/newsRouter');
const horairesRouter = require('../request/horairesRouter');
const menuRouter = require('../request/menuRouter');
const platsRouter = require('../request/platsRouter');
const resaAdminRouter = require('../request/reservationAdminRouter');
const resaClientRouter = require('../request/reservationClientRouter');
app.use('/user', userRouter);
app.use('/news', newsRouter);
app.use('/horaires', horairesRouter);
app.use('/menu', menuRouter);
app.use('/plats', platsRouter);
app.use('/resaAdmin', resaAdminRouter);
app.use('/resaClient', resaClientRouter);

app.get('/', (req, res) => {
  res.status(200).send('Wecome to LaBrickRouge API');
});

module.exports = app;