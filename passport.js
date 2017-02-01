const passport = require('passport')
const Strategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const db = require('./db/userDb')

passport.use(new Strategy((username, password, done) => {
  console.log({username, password});
  db.getUserByUser(username)
    .then((user) => {
      if (user.length === 0) done(null, false)
      else {
        done(null, user[0])
        // bcrypt.compare(password, user[0].password, (err, valid) => {
        //   if (err) done(err)
        //   else if (valid) done(null, user[0])
        //   else done(null, false)
        // })
      }
    })
    .catch((err) => {
      done(err)
    })
}))

passport.serializeUser((user, done) => {
  done(null, user.user_id)
})

passport.deserializeUser((id, done) => {
  db.getUserById(id)
    .then((user) => {
      done(null, user[0])
    })
    .catch((err) => {
      done(err)
    })
})

module.exports = passport
