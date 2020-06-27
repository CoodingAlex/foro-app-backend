const bcrypt = require('bcrypt')

const MongoLib = require('../lib/Mongo')
const { ObjectId } = require('mongodb')
const db = new MongoLib()

const COLLECTION = 'users'

class UsersService {
  async getUserById(id) {
    try {
      const user = await db.findOne(COLLECTION, { _id: ObjectId(id) })

      delete user.password

      return user
    } catch (err) {
      throw new Error(err)
    }
  }

  async getUserByUsername(username) {
    try {
      const user = await db.findOne(COLLECTION, { username })

      return user
    } catch (err) {
      throw new Error(err)
    }
  }

  async createUser(user) {
    try {
      const userExists = await this.getUserByUsername(user.username)

      if (userExists) {
        throw new Error('That username already exists')
      }

      const newUser = {
        username: user.username,
        name: user.name,
        password: await bcrypt.hash(user.password, 5),
      }

      const createdUser = await db.insertOne(COLLECTION, newUser)
      delete createdUser.password
      return createdUser
    } catch (err) {
      throw new Error(err)
    }
  }
}

module.exports = UsersService
