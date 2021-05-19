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
router.put('/password/:userId', updateUserPassword)
router.put('/email/:userId', updateUserEmail)

module.exports = router;