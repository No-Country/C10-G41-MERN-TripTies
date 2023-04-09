//? Dependencies
const express = require('express')
// require('dotenv').config()

//! Files
require('./src/database/database')
const routerModels = require('./src/routes/models.router')


//? Initial Configs
const app = express()
const PORT = process.env.PORT || 8000

//! Enable Cors

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

