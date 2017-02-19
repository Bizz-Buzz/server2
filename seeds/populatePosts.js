
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('posts').insert({user_id: 1, content: 'Anyone using this thing?', responses: 3}),
        knex('posts').insert({user_id: 2, content: 'sample post'}),
        knex('posts').insert({user_id: 3, content: 'another sample post'})
      ]);
    });
};
