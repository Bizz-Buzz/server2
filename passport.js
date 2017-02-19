const passport = require('passport')
const Strategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const db = require('./db/userDb')

passport.use(new Strategy((username, password, done) => {
  console.log({username, password});
  db.getUserByName(username)
    .then((user) => {
      if (user.length === 0) done(null, false)
      else {
        console.log("user exists");
        // done(null, user[0])
        bcrypt.compare(password, user[0].password, (err, valid) => {
          console.log("checking password");
          if (err) done(err)
          else if (valid) {
            console.log("valid");
            done(null, user[0])
          } else {
            console.log("invalid");
            done(null, false)
          }
        })
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
