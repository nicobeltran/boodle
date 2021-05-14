const {
  getAllUsers,
  getUserById
} = require('../controllers/user')
const router = require('express').Router()

router.get('/', getAllUsers)
router.get('/:userId', getUserById)

module.exports = router;