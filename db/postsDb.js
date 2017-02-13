const Knex = require('knex')
const config = require('../knexfile')[ process.env.NODE_ENV || 'development' ]
const knex = Knex(config)

getAllPosts = () => {
	return knex('posts')
		.join('users', 'posts.user_id', 'users.user_id')

}

createPost = (data) => {
	return knex('posts')
		.insert(data)
}

module.exports = {
  getAllPosts,
	createPost
}
