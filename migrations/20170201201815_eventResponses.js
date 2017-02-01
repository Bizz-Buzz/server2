
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('eventResponses', (table) => {
    table.increments('event_response_id')
    table.integer('event_id')
    table.integer('user_id')
    table.string('response_content')
    table.timestamp('response_created_at').defaultTo(knex.fn.now())
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('eventResponses')
};
