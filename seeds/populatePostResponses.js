
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('postResponses').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('postResponses').insert({post_id: 1, user_id: 1, response_content: 'hello'}),
        knex('postResponses').insert({post_id: 1, user_id: 1, response_content: 'friend'}),
        knex('postResponses').insert({post_id: 1, user_id: 1, response_content: 'xd'})
      ]);
    });
};
