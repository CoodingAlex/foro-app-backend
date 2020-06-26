const express = require('express')
const router = express.Router()

function usersRouter(app) {
  app.use('/users', router)

  router.get('/', (req, res, next) => {
    res.json({ hello: 'world' })
  })
}

module.exports = usersRouter
