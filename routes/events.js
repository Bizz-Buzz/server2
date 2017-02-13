var express = require('express');
var router = express.Router();

var bcrypt = require('bcrypt')
var passport = require('../passport')
const eventsDb = require('../db/eventsDb')

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log("events requested");
  eventsDb.getAllEvents()
    .then((events) => {
      res.json(events)
    })
});

router.post('/new', passport.authenticate('local'), (req, res) => {
  eventsDb.createEvent(req.body)
		.then((response) => {
			res.send('event created')
		})
})

module.exports = router;
