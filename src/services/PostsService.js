const MongoLib = require('../lib/Mongo')
const { ObjectId } = require('mongodb')
const db = new MongoLib()

const COLLECTION = 'posts'

class PostsService {
  async getAllPosts() {
    const posts = await db.find(COLLECTION, {})
    return posts
  }
  async getPostById(id) {
    const posts = await db.findOne(COLLECTION, { _id: ObjectId(id) })
    return posts
  }
  async createPost(post) {
    try {
      const createdPost = await (await db.insertOne(COLLECTION, post)).ops[0]
      console.log(createdPost)

      return createdPost
    } catch (err) {
      throw new Error(err)
    }
  }

  async updatePost(id, data) {
    try {
      const updatedPost = await db.updateOne(COLLECTION, id, data)
      return updatedPost
    } catch (err) {
      throw new Error(err)
    }
  }

  async deletePostById(id) {
    try {
      await db.removeOne(COLLECTION, { _id: ObjectId(id) })
      return id
    } catch (err) {
      throw new Error(err)
    }
  }
}

module.exports = PostsService
