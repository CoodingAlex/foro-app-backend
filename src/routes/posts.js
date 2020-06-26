const express = require('express')
const router = express.Router()

function postsRouter(app) {
  app.use('/posts', router)

  router.get('/', (req, res, next) => {
    res.json({ hello: 'world' })
  })
}

module.exports = postsRouter
