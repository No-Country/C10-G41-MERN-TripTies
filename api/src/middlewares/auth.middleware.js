const JwtStrategy = require('passport-jwt').Strategy
const { ExtractJwt } = require('passport-jwt')
const User = require('../services/user.services')
require('dotenv').config()

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
  secretOrKey: process.env.JWT_SECRET,
}

module.exports = (passport) =>
  passport.use(
    new JwtStrategy(options, (tokenDecoded, done) => {
      User.findUserById(tokenDecoded._id)
        .then((user) => {
          if (user) {
            done(null, tokenDecoded)
          } else {
            done(null, false)
          }
        })
        .catch((err) => {
          done(err, false)
        })
    })
  )
