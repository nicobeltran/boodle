const {
  getAllRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurant
} = require('../controllers/restaurant')
const router = require('express').Router()


router.get('/', getAllRestaurants)
router.get('/:restaurantId', getRestaurantById)
router.post('/', createRestaurant)
router.put('/', updateRestaurant)

module.exports = router;