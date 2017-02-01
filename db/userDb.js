const Knex = require('knex')
const config = require('../knexfile')[ process.env.NODE_ENV || 'development' ]
const knex = Knex(config)

getUserByName = (username) => {
  return knex('users')
    .where('username', username)
}

getUserById = (id) => {
  return knex('users')
    .where('user_id', id)
}

createNewUser = (first_name, last_name, email, password) => {
  return knex('users')
    .insert({first_name, last_name, email, password})
}

module.exports = {
  getUserByEmail,
  getUserById,
  createNewUser
}
