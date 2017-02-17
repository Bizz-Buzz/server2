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

router.post('/new', function(req, res, next) {
  res.send(req.user)
  // postsDb.createPost(req.user.user_id, req.data)
  //   .then((response) => {
  //     res.send(response)
  //   })
})

module.exports = router
