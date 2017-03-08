var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

const cors = require('cors')
const corsOptions = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  credentials: true
}
const passport = require('./passport')

var users = require('./routes/users');
var events = require('./routes/events');
var posts = require('./routes/posts')
var groups = require('./routes/groups')
var admin = require('./routes/admin')

var app = express();

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(require('express-session')({ secret: 'the cake is a lie', resave: false, saveUninitialized: false }))
app.use(passport.initialize())
app.use(passport.session())

app.use('/api/v1/users', users)
app.use('/api/v1/events', events)
app.use('/api/v1/posts', posts)
app.use('/api/v1/groups', groups)
app.use('/api/v1/admin', admin)
// app.use('/api/v1/posts', posts)

module.exports = app;
