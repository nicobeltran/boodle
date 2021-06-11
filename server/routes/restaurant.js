const {
  getAllRestaurants,
  getRestaurantByRestaurantId,
  getRestaurantsByRestaurantListId,
  createRestaurant,
  updateRestaurant
} = require('../controllers/restaurant')
const router = require('express').Router()


router.get('/', getAllRestaurants)
router.get('/:restaurantId', getRestaurantByRestaurantId)
router.get('/list/:restaurantListId', getRestaurantsByRestaurantListId)
router.post('/', createRestaurant)
router.put('/:restaurantId', updateRestaurant)

module.exports = router;