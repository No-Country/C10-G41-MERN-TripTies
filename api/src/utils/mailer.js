const nodemailer = require('nodemailer')
const config = require('../database/config')

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: config.mail.user,
    pass: config.mail.password
  }
})

module.exports = transporter