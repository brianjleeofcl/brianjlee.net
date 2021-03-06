const express = require('express');
const app = express();
const path = require('path');
const boom = require('boom');

if (process.env.NODE_ENV !== 'production') require('dotenv').load()

app.disable('x-powered-by');

app.use(require('morgan')('dev'), require('body-parser').json());

app.use((req, res, next) => {
  res.set('X-Gon', 'Give-It-To-Ya')
  next()
})

if (process.env.MAINTENANCE === 'true') {
  app.use(express.static(path.join(__dirname, '..', 'maintenance')))
}
else {
  app.use(express.static(path.join(__dirname, '..', 'public')))
}

app.use('/api/v1',require('./v1/api'));

app.use((req, res, next) => {
  next(boom.notFound());
});

app.use((err, req, res, next) => {
  const { statusCode, message } = err.output.payload;
  res.status(statusCode);
  res.send(message);
});

module.exports = app;
