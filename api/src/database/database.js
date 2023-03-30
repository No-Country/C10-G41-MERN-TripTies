const mongoose = require('mongoose')
require('dotenv').config()
const dbConection = mongoose.connection

const databaseConfig = require('./config')


mongoose
  .connect(process.env.DATABASE_URI_DEV, databaseConfig[process.env.NODE_ENV])
  .catch((error) => console.log(error))
dbConection.on('open', (_) => {
  console.log('database is connected to mongo atlas')
})
dbConection.on('error', (error) => {
  console.log(error)
})
