const Knex = require('knex')
const config = require('../knexfile')[ process.env.NODE_ENV || 'development' ]
const knex = Knex(config)

getAllEvents = () => {
	return knex('events')
		.join('users', 'events.user_id', 'users.user_id')
}

createEvent = (minute_id, hour_id, day_id, month_id, year_id, group_id, description, title, user_id) => {
	return knex('events')
		.insert({minute_id, hour_id, day_id, month_id, year_id, group_id, description, title, user_id})
}

getEventById = (event_id) => {
	return knex('events')
		.where('event_id', event_id)
}

getRSVPByUser = (user_id) => {
	return knex('eventRSVP')
		.where('user_id', user_id)
}

createEventRSVP = (event_id, going, user_id) => {
	return knex('eventRSVP')
		.insert({event_id, going, user_id})
}

clearExistingRSVP = (event_id, user_id) => {
	return knex('eventRSVP')
		.where('event_id', event_id)
		.andWhere('user_id', user_id)
		.del()
}

getRSVPsByEvent = (event_id) => {
	return knex('eventRSVP')
		.where('event_id', event_id)
}

updateRSVPCount = (event_id, RSVP_count) => {
	console.log({event_id, RSVP_count});
	return knex('events')
		.where('event_id', event_id)
		.update({RSVP_count})
}

module.exports = {
  getAllEvents,
	createEvent,
	getEventById,
	getRSVPByUser,
	createEventRSVP,
	clearExistingRSVP,
	getRSVPsByEvent,
	updateRSVPCount
}
