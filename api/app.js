//? Dependencies
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
// require('dotenv').config()

//! Files
require('./src/database/database')
const routerModels = require('./src/routes/models.router')


//? Initial Configs
const app = express()
const PORT = process.env.PORT || 8000

//! Enable Cors
const whitelist = ['http://localhost:8000']
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Denied By CORS'))
    }
  }
}

app.use(cors())

if (process.env.NODE_ENV === 'production') {
  /* Set security HTTP headers */
  /* For Error ERR_BLOCKED_BY_RESPONSE.NotSameOrigin 200 
       https://stackoverflow.com/questions/70752770/helmet-express-err-blocked-by-response-notsameorigin-200
  */
  app.use(helmet({ crossOriginResourcePolicy: false }))
}
//! Accept Json & form-urlencoded
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//! Authenticate DB

//TODO: when sessions get developed, delete getUserFromToken
const getUserFromToken = require('./src/middlewares/auth.aux.middleware')
app.use(getUserFromToken)

app.get('/', ({ res }) => {
  return res.json({
    status: 'Up',
    maintenance: false,
  })
})


//! Routes
routerModels(app)
// app.use(errorHandler)
/* 
    Tell everyone the state of your api
*/

app.listen(PORT, () => {
  console.log(`Server on PORT: ${PORT}`)
})

