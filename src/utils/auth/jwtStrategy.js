const passport = require('passport')
const { Strategy, ExtractJwt } = require('passport-jwt')
const boom = require('@hapi/boom')

const UsersService = require('../../services/UsersService')
const usersService = new UsersService()

const config = require('../../config')

passport.use(
  new Strategy(
    {
      secretOrKey: config.auth.jwt_secret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (payload, done) => {
      try {
        const user = await usersService.getUserByUsername(payload.username)
        if (!user) {
          return done(boom.unauthorized(), false)
        }
        delete user.password
        return done(null, user)
      } catch (err) {
        done(err, false)
      }
    }
  )
)
