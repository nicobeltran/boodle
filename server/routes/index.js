const router = require('express').Router()
const user = require('./user')
const restaurant = require('./restaurant')
const cuisine = require('./cuisine')
const restaurantlist = require('./restaurantlist')

router.use('/users', user)
router.use('/restaurants', restaurant)
router.use('/cuisines', cuisine)
router.use('/restaurantlist', restaurantlist)

module.exports = router