const {
  getAllRestaurants,
  getRestaurantById,
  createRestaurant
} = require('../controllers/restaurant')
const router = require('express').Router()


router.get('/', getAllRestaurants)
router.get('/:restaurantId', getRestaurantById)
router.post('/', createRestaurant)

module.exports = router;