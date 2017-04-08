const http = require('http');
const express = require('express');
const body = require('body-parser');
const morgan = require('morgan');
const shortid = require('shortid');

const app = express();

app.use(morgan('tiny'));
app.use(body.json());

app.post('/login', (req, res) => {
  const { name, gender } = req.body;
  const player = {
    name,
    gender,
    id: shortid.generate(),
  }
  res.json(player);
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  console.error(err);

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

module.exports = http.createServer(app);
