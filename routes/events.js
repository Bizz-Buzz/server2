var express = require('express');
var router = express.Router();

var bcrypt = require('bcrypt')
var passport = require('../passport')
const eventsDb = require('../db/eventsDb')

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
  console.log("events requested");
  eventsDb.getAllEvents()
    .then((events) => {
      res.json(events)
    })
});

router.post('/new', ensureAuthenticated, function(req, res) {
  console.log("new event", req.body);
  const {minute_id, hour_id, day_id, month_id, year_id, group_id, description, title} = req.body
  eventsDb.createEvent(minute_id, hour_id, day_id, month_id, year_id, group_id, description, title)
    .then((event_id) => {
      eventsDb.getEventById(event_id[0])
        .then((event) => {
          res.json(event[0])
        })
    })
})


module.exports = router;
