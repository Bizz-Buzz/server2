
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({user_id: 1, email: ' ', first_name: 'blank', last_name: "user", username: ' ', password: ' ', user_bio: 'test account'}),
        knex('users').insert({user_id: 2, email: 'symeshjb@gmail.com', first_name: 'Harrison', last_name: "Symes", username: 'symeshjb', password: ' ', user_bio: 'Harrison test account'}),
        knex('users').insert({user_id: 3, email: 'stuartm@gmail.com', first_name: 'Stuart', last_name: "Milner", username: 'stuartm', password: ' ', user_bio: 'Stuart test account'})
      ]);
    });
  };
