
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('posts', (table) => {
    table.increments('post_id')
    table.integer('user_id')
    table.timestamp('post_created_at').defaultTo(knex.fn.now())
    table.string('content')
    table.integer('group_id')
    table.integer('respones')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('posts')
};
