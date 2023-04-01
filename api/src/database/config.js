require('dotenv').config()

const config = {
  development: {
    mongodb_uri: process.env.DATABASE_URI_DEV,
    jwtSecret: process.env.JWT_SECRET,
  },
  test: {
    mongodb_uri: process.env.DATABASE_URI_TEST,
    jwtSecret: process.env.JWT_SECRET,
  },
  production: {
    mongodb_uri: process.env.DATABASE_URI_PROD,
    jwtSecret: process.env.JWT_SECRET,
  },
}

module.exports = config


