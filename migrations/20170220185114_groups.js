
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('groups', (table) => {
    table.increments('group_id')
    table.string('group_name')
    table.integer('member_count').defaultTo(1)
    table.timestamp('group_created_at').defaultTo(knex.fn.now())
    table.integer('parent_id').defaultTo(null)
    table.string('group_description').defaultTo('')
    table.boolean('invite_only').defaultTo(true)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('groups')
};
