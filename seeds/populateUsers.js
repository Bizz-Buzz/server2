
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({user_id: 1, email: ' ', first_name: 'Yum', last_name: "Bitch", username: ' ', password: '$2a$12$pFuS3YkOqFKGuo6JAWqj5.gMcH3lv.V211HYtg4YAOj/Hi4KBIZ26', user_bio: 'test account'}),
        knex('users').insert({user_id: 2, email: 'symeshjb@gmail.com', first_name: 'Harrison', last_name: "Symes", username: 'symeshjb', password: '$2a$12$pFuS3YkOqFKGuo6JAWqj5.gMcH3lv.V211HYtg4YAOj/Hi4KBIZ26', user_bio: 'Harrison test account'}),
        knex('users').insert({user_id: 3, email: 'stuartm@gmail.com', first_name: 'Stuart', last_name: "Milner", username: 'stuartm', password: '$2a$12$pFuS3YkOqFKGuo6JAWqj5.gMcH3lv.V211HYtg4YAOj/Hi4KBIZ26', user_bio: 'Stuart test account'})
      ]);
    });
  };
