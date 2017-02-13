var express = require('express');
var router = express.Router();

var bcrypt = require('bcrypt')
var passport = require('../passport')
const eventsDb = require('../db/eventsDb')
const postsDb = require('../db/postsDb')

/* GET users listing. */
router.get('/', function(req, res, next) {
  postsDb.getAllPosts()
    .then((posts) => {
      res.json(posts)
    })
});

module.exports = router
