var express = require('express');
var router = express.Router();

var bcrypt = require('bcrypt')
var passport = require('../passport')
const groupsDb = require('../db/groupsDb')

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
  groupsDb.getGroupsByUser(req.user.user_id)
		.then((groups) => {
			res.json(groups)
		})
});

router.get('/find', ensureAuthenticated, function(req, res, next) {
  groupsDb.getAllGroups()
    .then((all_groups) => {
      groupsDb.getGroupsByUser(req.user.user_id)
        .then((userGroups) => {
          var joined_ids = userGroups.map((group) => group.group_id)
          res.json(filterGroups(all_groups, joined_ids))
          // var unjoined = groups.filter((group) => {
          //   return groupIds.includes(1)
          // })
          // res.json(unjoined)
        })
    })

  function filterGroups(groups, ids) {
    console.log({groups, ids});
    var filtered = []
    for (var i = 0; i < groups.length; i++) {
      for (var j = 0; j < ids.length; j++) {
        if (groups[i].group_id === ids[j]) {
          console.log("already joined", i, j);
          break
        } else if (j === ids.length - 1) {
          console.log("unjoined", i, j);
          filtered.push(groups[i])
        }
      }
    }
    return filtered
  }
})

router.post('/new', ensureAuthenticated, function(req, res) {
	groupsDb.createNewGroup(req.body.group_name, req.body.group_description, req.body.invite_only, req.body.parent_id)
		.then(group_id => {
			console.log({group_id});
			groupsDb.createGroupJoin(group_id[0], req.user.user_id, true)
				.then(join_id => {
					console.log({join_id});
					groupsDb.getGroupById(group_id[0])
						.then((group) => {
							console.log({group});
							res.json(group[0])
						})
				})
		})
})

module.exports = router;
