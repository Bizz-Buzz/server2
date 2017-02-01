
exports.up = function(knex, Promise) {
  return knex.schema.creatTableIfNotExists('eventResponses', (table) => {
    knex.increments('event_response_id')
    knex.integer('event_id')
    knex.integer('user_id')
    knex.string('response_content')
    knex.timestamp('response_created_at').defaultTo(knex.fn.now())
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('eventResponses')
};
