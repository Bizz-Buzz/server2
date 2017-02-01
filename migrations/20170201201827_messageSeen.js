
exports.up = function(knex, Promise) {
  return knex.schema.creatTableIfNotExists('messageSeen', (table) => {
    table.increments('message_seen_id')
    table.integer('message_id')
    table.integer('user_id')
  })
};

exports.down = function(knex, Promise) {

};
