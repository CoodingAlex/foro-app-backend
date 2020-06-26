const express = require('express')
const router = express.Router()

const debug = require('debug')('api:routes:posts')

const PostsService = require('../services/PostsService')
const postsService = new PostsService()

function postsRouter(app) {
  app.use('/api/posts', router)

  router.get('/', async (req, res, next) => {
    try {
      debug('request to GET /api/posts')
      const data = await postsService.getAllPosts()
      res.status(200).json({ message: 'posts getted', data })
    } catch (err) {
      next(err)
    }
  })
  router.get('/:postId', async (req, res, next) => {
    try {
      debug('request to GET /api/posts/:postId')
      const { postId } = req.params
      const data = await postsService.getPostById(postId)
      res.status(200).json({ message: 'post getted', data })
    } catch (err) {
      next(err)
    }
  })

  router.post('/', async (req, res, next) => {
    try {
      debug('request to POST /api/posts/')
      const post = req.body

      const { _id, title } = await postsService.createPost(post)
      res
        .status(201)
        .json({ message: 'post created', data: { id: _id, title } })
    } catch (err) {
      next(err)
    }
  })
  router.put('/:postId', async (req, res, next) => {
    try {
      debug('request to PUT /api/posts/:postId')
      const { postId } = req.params
      const post = req.body

      const updatedPost = await postsService.updatePost(postId, post)
      res.status(200).json({ message: 'post updated', data: updatedPost })
    } catch (err) {
      next(err)
    }
  })
  router.delete('/:postId', async (req, res, next) => {
    try {
      debug('request to DELETE /api/posts/:postId')
      const { postId } = req.params
      const deletedPost = await postsService.deletePostById(postId)
      res.status(200).json({ message: 'post deleted', data: deletedPost })
    } catch (err) {
      next(err)
    }
  })
}

module.exports = postsRouter
