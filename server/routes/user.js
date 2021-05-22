const {
  getAllUsers,
  getUserById,
  postUserByEmailAndPassword,
  createNewUser,
  updateUserPassword,
  updateUserEmail
} = require('../controllers/user')
const router = require('express').Router()

router.get('/', getAllUsers)
router.get('/:userId', getUserById)
router.post('/authenticate', postUserByEmailAndPassword)
router.post('/', createNewUser)
router.put('/password/:userId', updateUserPassword)
router.put('/email/:userId', updateUserEmail)

module.exports = router;