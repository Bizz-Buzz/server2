const Knex = require('knex')
const config = require('../knexfile')[ process.env.NODE_ENV || 'development' ]
const knex = Knex(config)

getAllPosts = () => {
	return knex('posts')
		.join('users', 'posts.user_id', 'users.user_id')
		.orderBy('post_created_at', 'desc')

}

createPost = (user_id, content) => {
	return knex('posts')
		.insert({user_id, content})
}

module.exports = {
  getAllPosts,
	createPost
}
