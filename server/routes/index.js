const router = require('express').Router()
const user = require('./user')
const restaurant = require('./restaurant')
const cuisine = require('./cuisine')

router.use('/users', user)
router.use('/restaurants', restaurant)
router.use('/cuisines', cuisine)

module.exports = router