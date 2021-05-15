const {
  getAllUsers,
  getUserById,
  createNewUser,
  updateUserPassword,
  updateUserEmail
} = require('../controllers/user')
const router = require('express').Router()

router.get('/', getAllUsers)
router.get('/:userId', getUserById)
router.post('/', createNewUser)
router.put('/password', updateUserPassword)
router.put('/email', updateUserEmail)

module.exports = router;