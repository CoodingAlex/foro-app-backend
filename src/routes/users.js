const express = require('express')
const router = express.Router()

const UsersService = require('../services/UsersService')
const usersService = new UsersService()

function usersRouter(app) {
  app.use('/api/users', router)

  router.get('/:userId', async (req, res, next) => {
    try {
      const { userId } = req.params
      const data = await usersService.getUserById(userId)

      res.json({ message: 'user getted', data })
    } catch (err) {
      next(err)
    }
  })
}

module.exports = usersRouter
