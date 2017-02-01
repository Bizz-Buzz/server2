
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('postSeen', (table) => {
    table.increments('post_id')
    table.integer('user_id')
    table.timestamp('post_seen_at').defaultTo(knex.fn.now())
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('postSeen')
};
