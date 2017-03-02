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
  eventsDb.getAllEvents(Number(req.user.user_id))
    .then((events) => {
      eventsDb.getRSVPByUser(Number(req.user.user_id))
        .then((RSVPs) => {
          res.json({events, RSVPs})
        })
    })
});

router.post('/new', ensureAuthenticated, function(req, res) {
  const body = req.body
  console.log("new event", req.body);
  eventsDb.createEvent(Number(req.body.minute_id), Number(req.body.hour_id), Number(req.body.day_id), Number(req.body.month_id), Number(req.body.year_id), Number(req.body.group_id), req.body.description, req.body.title, Number(req.user.user_id))
    .then((event_id) => {
      console.log(event_id[0]);
      eventsDb.getEventById(event_id[0])
        .then((event) => {
          res.json(event[0])
        })
    })
    .catch((err) => {
      console.log((err))
    })
})

router.post('/RSVP/new', ensureAuthenticated, function(req, res) {
  console.log(req.body);
  eventsDb.clearExistingRSVP(Number(req.body.event_id), Number(req.user.user_id))
    .then((RSVP) => {
        eventsDb.createEventRSVP(Number(req.body.event_id), req.body.going, Number(req.user.user_id))
          .then((RSVP_id) => {
            eventsDb.getRSVPsByEvent(Number(req.body.event_id))
              .then((RSVPs) => {
                var attendingCount = RSVPs.filter((RSVP) => {
                  return RSVP.going == true
                }).length
                console.log({attendingCount});
                eventsDb.updateRSVPCount(Number(req.body.event_id), attendingCount)
                  .then((krang) => {
                    console.log({krang});
                    eventsDb.getRSVPByUser(Number(req.user.user_id))
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
