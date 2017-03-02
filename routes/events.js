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
  eventsDb.getAllEvents(req.user.user_id)
    .then((events) => {
      eventsDb.getRSVPByUser(req.user.user_id)
        .then((RSVPs) => {
          res.json({events, RSVPs})
        })
    })
});

router.post('/new', ensureAuthenticated, function(req, res) {
  console.log("new event", req.body);
  const {minute_id, hour_id, day_id, month_id, year_id, group_id, description, title} = req.body
  eventsDb.createEvent(minute_id, hour_id, day_id, month_id, year_id, group_id, description, title, req.user.user_id)
    .then((event_id) => {
      console.log({event_id});
      eventsDb.getEventById(event_id[0])
        .then((event) => {
          res.json(event[0])
        })
    })
    .catch((err) => console.log((err));)
})

router.post('/RSVP/new', ensureAuthenticated, function(req, res) {
  console.log(req.body);
  eventsDb.clearExistingRSVP(req.body.event_id, req.user.user_id)
    .then((RSVP) => {
        eventsDb.createEventRSVP(req.body.event_id, req.body.going, req.user.user_id)
          .then((RSVP_id) => {
            eventsDb.getRSVPsByEvent(req.body.event_id)
              .then((RSVPs) => {
                var attendingCount = RSVPs.filter((RSVP) => {
                  return RSVP.going == true
                }).length
                console.log({attendingCount});
                eventsDb.updateRSVPCount(req.body.event_id, attendingCount)
                  .then((krang) => {
                    console.log({krang});
                    eventsDb.getRSVPByUser(req.user.user_id)
                      .then((RSVPs) => {
                        res.json(RSVPs)
                      })
                  })
              })

          })
    })
})

// router.post('/RSVP/new', ensureAuthenticated, function(req, res) {
//   console.log(req.body);
//   eventsDb.createEventRSVP(req.body.event_id, req.body.going, req.user.user_id)
//     .then((RSVP_id) => {
//       eventsDb.getRSVPByUser(req.user.user_id)
//         .then((RSVPs) => {
//           res.json(RSVPs)
//         })
//     })
// })


module.exports = router;
