const errorHandler = (err, req, res, next) => {
  const status = err.status || 500
  const message = err.message || 'Internal Server Error'
  const fields = err.fields || {}

  res.status(status).json({ message, fields })
}

module.exports = {errorHandler}