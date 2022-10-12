const express = require('express');
const expressSession = require('express-session');
const cors = require('cors');
const router = require('./routers');
const errorHandler = require('./helpers/errorHandler');
const ApiError = require('./error/apiError');

process.on('unhandledRejection', (err) => {
  throw err;
});
process.on('uncaughtException', (err) => {
  // eslint-disable-next-line no-console
  console.log(err);
  process.exit(0);
});

const app = express();

app.use(express.json());

app.use(cors('*'));

app.use(
  expressSession({
    resave: true,
    saveUninitialized: true,
    secret: 'AlexLeGoat',
  }),
);

app.use(router);

app.use((req, res, next) => {
  next(new ApiError('endpoint not found', { statusCode: 404 }));
});

app.use(errorHandler);
module.exports = app;
