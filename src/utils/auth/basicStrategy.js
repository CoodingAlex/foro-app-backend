const passport = require('passport')
const { BasicStrategy } = require('passport-http')
const boom = require('@hapi/boom')

const bcrypt = require('bcrypt')

const UsersService = require('../../services/UsersService')
const usersService = new UsersService()

passport.use(
  new BasicStrategy(async (username, password, done) => {
    try {
      const user = await usersService.getUserByUsername(username)
      if (!user) {
        return done(boom.unauthorized(), false)
      }

      if (!(await bcrypt.compare(password, user.password))) {
        return done(boom.unauthorized(), false)
      }

      delete user.password

      done(null, user)
    } catch (err) {
      done(err, false)
    }
  })
)
