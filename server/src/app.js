const express = require('express');
const app = express();
const path = require('path');
const boom = require('boom');

if (process.env.NODE_ENV !== 'production') require('dotenv').load()

app.disable('x-powered-by');

app.use(require('morgan')('dev'), require('body-parser').text());

if (process.env.MAINTENANCE === 'true') {
  app.use(express.static(path.join(__dirname, '..', '..', 'maintenance')))
}
else {
  console.log(process.env.MAINTENANCE)
  app.use(express.static(path.join(__dirname, '..', '..', 'public')))
}

app.use('/api/v1',require('./v1/api'));

app.use((req, res, next) => {
  next(boom.notFound());
});

app.use((err, req, res, next) => {
  const { output, message } = err;
  res.status(output.statusCode);
  res.send(message);
});

module.exports = app;
