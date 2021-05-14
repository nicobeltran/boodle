const router = require('express').Router()
const user = require('./user')
const restaurant = require('./restaurant')

router.use('/users', user)
router.use('/restaurants', restaurant)

module.exports = router