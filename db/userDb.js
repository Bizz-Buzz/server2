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

getUserList = (group_id) => {
  return knex('users')
}

getUsersByGroup = (group_id) => {
  return knex('users')
    .join('joins', 'users.user_id', 'joins.user_id')
    .where('joins.group_id', group_id)
}

module.exports = {
  getUserByName,
  getUserById,
  createNewUser,
  getUserList,
  getUsersByGroup
}
