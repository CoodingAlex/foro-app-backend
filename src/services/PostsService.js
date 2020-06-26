const MongoLib = require('../lib/Mongo')
const db = new MongoLib()

const COLLECTION = 'posts'

class PostsService {
  async getAllPosts() {
    const posts = await db.find(COLLECTION, {})
    return posts
  }
  async getPostById(id) {
    const posts = await db.find(COLLECTION, { _id: id })
    return posts
  }
  async createPost(post) {
    try {
      const createdPost = await db.insertOne(COLLECTION, post)
      return createdPost
    } catch (err) {
      throw new Error(err)
    }
  }
}

module.exports = PostsService
