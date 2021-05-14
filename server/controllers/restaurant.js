const pool = require('../db/database')

  /**
   * Function to get all restaurants
   * @param req
   * @param res
   * @return list of all restaurants
   */
  const getAllRestaurants = async (req, res) => {
      try {

        const query = `SELECT r.restaurant_id, r.restaurant_name, r.restaurant_address, r.last_datetime_selected, 
        CASE WHEN count(ct.*) = 0 THEN '[]'::JSON ELSE json_agg(DISTINCT ct.cuisine_name) END AS cuisines 
        FROM restaurants r 
        JOIN restaurant_cuisines rc ON r.restaurant_id = rc.restaurant_id 
        JOIN cuisine_types ct ON rc.cuisine_id = ct.cuisine_id 
        GROUP BY r.restaurant_id;`

        const {rows} = await pool.query(query);
          return res.status(200).json({ restaurants: rows })
      } catch (err) {
          console.log(err)
          return res.status(500).json({ message: 'There was an error. Please try again later' })
      }
    }

  /**
   * Function to get a restaurant by a restaurant ID
   * @param req
   * @param res
   * @return returns data for a single restaurant with matching ID
   */
  const getRestaurantById = async (req, res) => {
    try {
        let restaurantId = req.params.restaurantId

        const query = `SELECT r.restaurant_id, r.restaurant_name, r.restaurant_address, r.last_datetime_selected, 
        CASE WHEN count(ct.*) = 0 THEN '[]'::JSON ELSE json_agg(DISTINCT ct.cuisine_name) END AS cuisines 
        FROM restaurants r 
        JOIN restaurant_cuisines rc ON r.restaurant_id = rc.restaurant_id 
        JOIN cuisine_types ct ON rc.cuisine_id = ct.cuisine_id WHERE r.restaurant_id = ${restaurantId} 
        GROUP BY r.restaurant_id;`

        const {rows} = await pool.query(query);
        return res.status(200).json({ restaurant: rows[0] })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'There was an error. Please try again later' })
    }
  }

  module.exports = {
    getAllRestaurants,
    getRestaurantById
  }