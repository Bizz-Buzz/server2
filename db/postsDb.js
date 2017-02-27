const Knex = require('knex')
const config = require('../knexfile')[ process.env.NODE_ENV || 'development' ]
const knex = Knex(config)

getAllPosts = () => {
	return knex('posts')
		.join('users', 'posts.user_id', 'users.user_id')
		.orderBy('post_created_at', 'desc')

}

createPost = (user_id, content, is_alert) => {
	return knex('posts')
		.insert({user_id, content, is_alert})
}

getPostResponses = (post_id) => {
	return knex ('postResponses')
		.join('users', 'postResponses.user_id', 'users.user_id')
		.where('postResponses.post_id', post_id)
		.orderBy('post_response_created_at', 'desc')
}

createPostResponse = (post_id, user_id, response_content) => {
	return knex('postResponses')
		.insert({post_id, user_id, response_content})
}

setPostResponses = (post_id, responses) => {
	return knex('posts')
		.update('responses', responses)
		.where('post_id', post_id)
}

module.exports = {
  getAllPosts,
	createPost,
	getPostResponses,
	createPostResponse,
	setPostResponses
}
