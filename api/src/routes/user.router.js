const express = require('express')
const router = express.Router()
const passport = require('passport')
require('../middlewares/auth.middleware')(passport)

const {
  deleteUser,
  getUserById,
  getAllUsers,
} = require('../controllers/user.controller')
const isAdmin = require('../middlewares/isAdmin.middleware')

router.get('/', passport.authenticate('jwt', { session: false }), isAdmin, getAllUsers) //Only admins

router.route('/:userId')
  .get(getUserById)
  .delete(passport.authenticate('jwt', {session: false}), deleteUser)



module.exports = router
