const pool = require('../db/database')
const util = require('../util/util')
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
          return res.status(500).json({ message: 'There was an error. Please try again later' })
      }
    }

  /**
   * Function to get a restaurant by a restaurant ID
   * @param req
   * @param res
   * @return returns data for a single restaurant with matching ID
   */
  const getRestaurantByRestaurantId = async (req, res) => {
    try {
        const restaurantId = req.params.restaurantId

        const query = `SELECT r.restaurant_id, r.restaurant_name, r.restaurant_address, r.last_datetime_selected, 
        CASE WHEN count(ct.*) = 0 THEN '[]'::JSON ELSE json_agg(DISTINCT ct.cuisine_name) END AS cuisines 
        FROM restaurants r 
        JOIN restaurant_cuisines rc ON r.restaurant_id = rc.restaurant_id 
        JOIN cuisine_types ct ON rc.cuisine_id = ct.cuisine_id 
        WHERE r.restaurant_id = ${restaurantId} 
        GROUP BY r.restaurant_id;`

        const {rows} = await pool.query(query);
        return res.status(200).json({ restaurant: rows[0] })
    } catch (err) {
        return res.status(500).json({ message: 'There was an error. Please try again later' })
    }
  }

  /**
   * Function to get restaurants by a restaurant list ID
   * @param req
   * @param res
   * @return returns all restaurants linked to the restaurant list ID
   */
  const getRestaurantsByRestaurantListId = async (req, res) => {
    try {
        const restaurantListId = req.params.restaurantListId

        const query = `SELECT r.restaurant_id, restaurant_name, restaurant_address, last_datetime_selected,
                        CASE WHEN count(ct.*) = 0 THEN '[]'::JSON ELSE json_agg(DISTINCT ct.cuisine_name) END AS cuisines 
                        FROM restaurants r
                        JOIN restaurant_cuisines rc ON r.restaurant_id = rc.restaurant_id
                        JOIN cuisine_types ct ON rc.cuisine_id = ct.cuisine_id
                        JOIN restaurantList_restaurant ON r.restaurant_id = restaurantlist_restaurant.restaurant_id
                        WHERE restaurant_list_id = ${restaurantListId}
                        GROUP BY r.restaurant_id
                        ORDER BY restaurant_name ASC`;

        const {rows} = await pool.query(query);
        return res.status(200).json({ restaurants: rows })

    } catch (err) {
        return res.status(500).json({ message: 'There was an error. Please try again later' })
    }
  }

    /**
   * Function to create a new restaurant
   * @param req
   * @param res
   * @return returns data from newly created restaurant
   */
  const createRestaurant = async(req, res) => {
    // body data format
    //   {
    //     "restaurantData": {
    //         "restaurantName": "Tomikawa",
    //         "restaurantAddress": "14191 Jeffrey Rd, Irvine, CA 92620"
    //     },
    //     "cuisineIds": [3]
    //   }
    const restaurantData = req.body.restaurantData
      
    const columns = {
      restaurantName: 'restaurant_name',
      restaurantAddress: 'restaurant_address'
    }

    try {
      // pull out which columns needed to be inserted and what values
      const colsAndValues = util.getInsertQueryColumnsAndValues(restaurantData, columns)

      // Insert restaurant data into restaurants table
      const insertRestaurantQuery = `INSERT INTO restaurants(${colsAndValues.columnsToInsert}) VALUES (${colsAndValues.valuesToInsert}) RETURNING *`
      const {rows} = await pool.query(insertRestaurantQuery);

      // pull out restaurant id once restaurant is made
      const restaurantId = rows[0].restaurant_id

      // insert into restaurant_cuisines to link restaurant to cuisine types
      const restaurantCuisineValues = util.getInsertIntoStringForJunctionTables(restaurantId, req.body.cuisineIds)      
      const insertIntoRestaurantCuisinesQuery = `INSERT INTO restaurant_cuisines(restaurant_id, cuisine_id) VALUES ${restaurantCuisineValues}`
      await pool.query(insertIntoRestaurantCuisinesQuery);

      return res.status(200).json({rows})
    }
    catch (err) {
      return res.status(500).json({ message: err.message })

    }
  }

  const updateRestaurant = async(req, res) => {
    // body data format
    //   {
    //     "restaurantId": 1,
    //     "restaurantData": {
    //         "restaurantName": "McDonalds",
    //         "restaurantAddress": "5445 Alton Pkwy, Irvine, CA 92614"
    //     }
    // }
    try {
      const updatedData = req.body
      const restaurantId = req.params.restaurantId

      const columns = {
        restaurantName: 'restaurant_name',
        restaurantAddress: 'restaurant_address'
      }

      let updateString = util.getFormattedUpdateString(updatedData, columns)

      const query = `UPDATE restaurants
                    SET ${updateString}
                    WHERE restaurant_id = ${restaurantId};`

      const {rows} = await pool.query(query);

      return res.status(200).json({})
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  }

  module.exports = {
    getAllRestaurants,
    getRestaurantByRestaurantId,
    getRestaurantsByRestaurantListId,
    createRestaurant,
    updateRestaurant
  }