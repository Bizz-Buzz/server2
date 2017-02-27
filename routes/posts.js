var express = require('express');
var router = express.Router();

var bcrypt = require('bcrypt')
var passport = require('../passport')
const eventsDb = require('../db/eventsDb')
const postsDb = require('../db/postsDb')

function ensureAuthenticated (req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  } else {
    res.json({
      'error':
      {
        'type': 'auth',
        'code': 401,
        'message': 'authentication failed'
      }
    })
  }
}

/* GET users listing. */
router.get('/', ensureAuthenticated, function(req, res, next) {
  postsDb.getAllPosts()
    .then((posts) => {
      res.json(posts)
    })
});

router.post('/new', ensureAuthenticated, function(req, res, next) {
  postsDb.createPost(req.user.user_id, req.body.content, req.body.is_alert, req.body.group_id)
    .then((response) => {
      postsDb.getAllPosts()
        .then((posts) => {
          res.json(posts)
        })
    })
})

router.get('/responses', ensureAuthenticated, function(req, res) {
  postsDb.getPostResponses(req.query.post_id)
    .then((postResponses) => {
      res.json(postResponses)
    })
})

router.post('/responses', function(req, res) {
  postsDb.createPostResponse(req.body.post_id, req.user.user_id, req.body.response_content)
    .then((response_id) => {
      postsDb.getPostResponses(req.body.post_id)
        .then((responses) => {
          postsDb.setPostResponses(req.body.post_id, responses.length)
            .then((something) => {
              res.json(response_id[0])
            })
        })
    })
})

module.exports = router
