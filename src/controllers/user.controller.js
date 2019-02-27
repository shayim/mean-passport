const router = require('express').Router()
const User = require('../models/user.model')
const auth = require('../middlewares/auth')
router.get('/users', auth, async (req, res) => {
  const users = await User.find()
  res.json(users)
})

module.exports = router
