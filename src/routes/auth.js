const express = require('express')
const router = express.Router()

const config = require('../config')

const jwt = require('jsonwebtoken')
const passport = require('passport')

require('../utils/auth/basicStrategy')

const UsersService = require('../services/UsersService')
const usersService = new UsersService()

function authRouter(app) {
  app.use('/api/auth', router)

  router.post('/sign-up', async (req, res, next) => {
    try {
      const user = req.body
      const createdUser = await usersService.createUser(user)

      res.status(201).json({
        message: 'user created',
        data: { id: createdUser._id, username: createdUser.username },
      })
    } catch (err) {
      next(err)
    }
  })

  router.post(
    '/sign-in',
    passport.authenticate('basic', { session: false }),
    (req, res, next) => {
      try {
        const payload = {
          username: req.user.username,
          name: req.user.name,
          sub: req.user._id,
        }

        const token = jwt.sign(payload, config.auth.jwt_secret)
        res.status(200).json({ data: token })
      } catch (err) {
        next(err)
      }
    }
  )
}

module.exports = authRouter
