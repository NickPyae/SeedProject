let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let cors = require('cors');
let expressValidator = require('express-validator');
let mongoose = require('mongoose');

let appRoutes = require('./routes/app');
let userRoutes = require('./routes/user');;

let app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/seedproject');

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// express validator
app.use(expressValidator({
  errorFormatter: (param, msg, value) => {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// enable cross-origin resource sharing
app.use(cors());

app.use('/user', userRoutes);
app.use('/', appRoutes);

// catch 404 and forward to index page
app.use((req, res, next) => {
  res.render('index');
});

module.exports = app;
