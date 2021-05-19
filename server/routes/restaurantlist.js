const {
    getRestaurantListsByUserId,
    createRestaurantList,
    updateRestaurantListName,
    deleteRestaurantList
} = require('../controllers/restaurantlist')
const router = require('express').Router()

router.get('/:userId', getRestaurantListsByUserId)
router.post('/', createRestaurantList)
router.put('/:restaurantListId', updateRestaurantListName)
router.delete('/:restaurantListId', deleteRestaurantList)

module.exports = router;

