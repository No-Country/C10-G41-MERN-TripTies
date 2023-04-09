const express = require('express')
const router = express.Router()
const passport = require('passport')
require('../middlewares/auth.middleware')(passport)
const isOwner = require('../middlewares/isOwner.middleware')

const {
  deleteUser,
  getUserById,
} = require('../controllers/user.controller')
const { followUser } = require('../controllers/follow.controller')
const { putUserProfile } = require('../controllers/profile.controller')
const { createRole } = require('../services/user.services')

router.route('/:userId')
  .get(getUserById)
  .delete(isOwner, deleteUser)

router.put('/:userId/editProfile',isOwner, putUserProfile) //Fix put service. Dont save the information

router.route('/:userId/follow/:followingId')
  .post(isOwner, followUser)






  
router.post('/roles', async (req, res) => {
  const roleName = req.body.name
  try {
    const newRole = await createRole(roleName)
    res.status(201).json(newRole)
  } catch (error) {
    console.error(error)
    res.status(500).send('Error creating role')
  }
})

module.exports = router