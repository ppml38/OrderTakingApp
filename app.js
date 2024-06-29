var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user');
var menuRouter = require('./routes/menu');
var menuItemRouter = require('./routes/menuItem');
var orderRouter = require('./routes/order');

const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Order taking app',
    version: '1.0.0',
    description:
      'Backend system of order taking app',
    license: {
      name: 'Licensed Under MIT',
      url: 'https://github.com/ppml38/OrderTakingApp/blob/master/LICENSE',
    },
    contact: {
      "name": "Prakash",
      "url": "https://liju.me",
      "email": "prakash@liju.me"
    },
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/menu', menuRouter);
app.use('/menuItem', menuItemRouter);
app.use('/order', orderRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
//app.get('/api-docs', );

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
