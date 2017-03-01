const Knex = require('knex')
const config = require('../knexfile')[ process.env.NODE_ENV || 'development' ]
const knex = Knex(config)

getAllEvents = () => {
	return knex('events')
		.join('users', 'events.user_id', 'users.user_id')

}

createEvent = (minute_id, hour_id, day_id, month_id, year_id, group_id, description, title) => {
	return knex('events')
		.insert({minute_id, hour_id, day_id, month_id, year_id, group_id, description, title})
}

getEventById = (event_id) => {
	return knex('events')
		.where('event_id', event_id)
}

module.exports = {
  getAllEvents,
	createEvent,
	getEventById
}
