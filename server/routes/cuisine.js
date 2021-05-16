const {
    getAllCuisineTypes,
    createNewCuisineType
  } = require('../controllers/cuisine')
  const router = require('express').Router()
  
  
  router.get('/', getAllCuisineTypes)
//   router.get('/:restaurantId', getRestaurantById)
  router.post('/', createNewCuisineType)
  
  module.exports = router;