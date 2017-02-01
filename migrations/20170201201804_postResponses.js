
exports.up = function(knex, Promise) {
  return knex.schema.creatTableIfNotExists('postResponse', (table) => {
    table.increments('post_response_id')
    table.string('response_content')
    table.integer('post_id')
    table.integer('user_id')
    table.timestamp('post_response_created_at').defaultTo(knex.fn.now())
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('postRespones')
};
