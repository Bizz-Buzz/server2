
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('eventRSVP', (table) => {
    table.increments('RSVP_id')
    table.integer('event_id')
    table.integer('user_id')
    table.boolean('going').defaultTo(false)
    table.timestamp('RSVP_created_at').defaultTo(knex.fn.now())
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('eventRSVP')
};
