const Knex = require('knex')
const config = require('../knexfile')[ process.env.NODE_ENV || 'development' ]
const knex = Knex(config)

getAllEvents = () => {
	return knex('events')
}

createEvent = ({title, user_id, group_id, description, date_time}) => {
	return knex('events')
		.insert({title, user_id, group_id, description, date_time})
}

module.exports = {
  getAllEvents,
	createEvent
}
