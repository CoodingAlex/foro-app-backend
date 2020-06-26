const express = require('express')
const router = express.Router()

const CommentsService = require('../services/CommentsService')
const commentsService = new CommentsService()

const debug = require('debug')('api:routes:comments')

function commentsRouter(app) {
  app.use('/api/comments', router)

  router.get('/post/:postId', async (req, res, next) => {
    try {
      debug('request to GET /api/comments/post/:postId')
      const { postId } = req.params

      const data = await commentsService.getCommentsByPost(postId)
      res.status(200).json({ message: 'comments getted', data })
    } catch (err) {
      next(err)
    }
  })

  router.get('/:commentId', async (req, res, next) => {
    try {
      debug('request to GET /api/comments/:commentId')
      const { commentId } = req.params
      const data = await commentsService.getCommentById(commentId)
      res.status(200).json({ message: 'comment getted', data })
    } catch (err) {
      next(err)
    }
  })

  router.post('/post/:postId', async (req, res, next) => {
    try {
      debug('request to POST /api/comments/post/:postId')
      const { postId } = req.params
      const comment = req.body
      const data = await commentsService.createComment(postId, comment)
      res.status(201).json({ message: 'comment created', data })
    } catch (err) {
      next(err)
    }
  })

  router.put('/:commentId', async (req, res, next) => {
    try {
      debug('request to PUT /api/comments/:commentId')
      const { commentId } = req.params
      const comment = req.body
      const data = await commentsService.updateComment(commentId, comment)
      res.status(200).json({ message: 'comment updated', data })
    } catch (err) {
      next(err)
    }
  })

  router.delete('/:commentId', async (req, res, next) => {
    try {
      debug('request to DELETE /api/comments/:commentId')
      const { commentId } = req.params
      const data = await commentsService.deleteCommentById(commentId)
      res.status(200).json({ message: 'comment deleted', data })
    } catch (err) {
      next(err)
    }
  })
}

module.exports = commentsRouter
