const Knex = require('knex')
const config = require('../knexfile')[ process.env.NODE_ENV || 'development' ]
const knex = Knex(config)

getAllEvents = () => {
	return knex('events')
		.join('users', 'events.user_id', 'users.user_id')

}

createEvent = (data) => {
	return knex('events')
		.insert(data)
}

module.exports = {
  getAllEvents,
	createEvent
}
