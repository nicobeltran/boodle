const {
  getAllRestaurants,
  getRestaurantById
} = require('../controllers/restaurant')
const router = require('express').Router()


router.get('/', getAllRestaurants)
router.get('/:restaurantId', getRestaurantById)

module.exports = router;