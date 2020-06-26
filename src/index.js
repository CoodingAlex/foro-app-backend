const express = require('express')
const app = express()
const port = process.env.PORT || 3000

//middlewares
const {
  errorHandler,
  errorLogger,
  errorWrapper,
} = require('./utils/middlewares/ErrorHandler')
const chalk = require('chalk')
//Routes
const usersRouter = require('./routes/users')
const postsRouter = require('./routes/posts')
const commentsRouter = require('./routes/comments')

//middlewares

app.use(express.json())

//router
postsRouter(app)
usersRouter(app)
commentsRouter(app)
//error middlewares

app.use(errorLogger)
app.use(errorWrapper)
app.use(errorHandler)

app.listen(3000, () => {
  console.log(`${chalk.green('[API]')} listening on port ${port}`)
})
