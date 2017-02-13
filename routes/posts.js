var express = require('express');
var router = express.Router();

var bcrypt = require('bcrypt')
var passport = require('../passport')
const eventsDb = require('../db/eventsDb')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json('gotem')
});

module.exports = router
