const MongoLib = require('../lib/Mongo')
const { ObjectId } = require('mongodb')
const db = new MongoLib()

const COLLECTION = 'comments'

class CommentsService {
  async getCommentsByPost(postId) {
    try {
      const comments = await db.find(COLLECTION, { post: postId })
      return comments
    } catch (err) {
      throw new Error(err)
    }
  }

  async getCommentById(id) {
    try {
      const comment = await db.findOne(COLLECTION, { _id: ObjectId(id) })
      return comment
    } catch (err) {
      throw new Error(err)
    }
  }

  async createComment(postId, comment) {
    try {
      const newComment = { ...comment, post: postId }
      const createdComment = await db.insertOne(COLLECTION, newComment)
      return createdComment
    } catch (err) {
      throw new Error(err)
    }
  }

  async updateComment(id, comment) {
    try {
      const updatedComment = await db.updateOne(COLLECTION, id, comment)
      return updatedComment
    } catch (err) {
      throw new Error(err)
    }
  }

  async deleteCommentById(id) {
    try {
      const deletedComment = await db.removeOne(COLLECTION, {
        _id: ObjectId(id),
      })
      return id
    } catch (err) {
      throw new Error(err)
    }
  }
}

module.exports = CommentsService
