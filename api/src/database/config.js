require('dotenv').config()

module.exports = {
  app: {
    host: process.env.HOST || 'http://localhost:3000',
    port: process.env.PORT || 3000
  },
  db: {
    url: process.env.MONGO_URL
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET,
    bcryptSaltRounds: process.env.BCRYPT_SALT_ROUNDS
  },
  mail: {
    password: process.env.MAIL_PASS,
    user: process.env.MAIL_USER
  },
  storage: {
    awsBucketName: process.env.AWS_BUCKET_NAME,
    awsBucketRegion: process.env.AWS_BUCKET_REGION,
    awsAccessKey: process.env.AWS_ACCESS_KEY,
    awsSecretKey: process.env.AWS_SECRET_KEY
  }
}
