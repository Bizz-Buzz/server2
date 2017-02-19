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
  postsDb.createPost(req.user.user_id, req.body.content)
    .then((response) => {
      res.json({post_id: response})
    })
})

router.get('/responses', function(req, res) {
  postsDb.getPostResponses(req.query.post_id)
    .then((postResponses) => {
      res.json(postResponses)
    })
})

router.post('/responses', function(req, res) {
  postsDb.createPostResponse(req.body.post_id, req.user.user_id, req.body.response_content)
    .then((response_id) => {
      res.json(response_id[0])
    })
})

module.exports = router
