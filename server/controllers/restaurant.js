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
        const restaurantId = req.params.restaurantId

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

  const createRestaurant = async(req, res) => {
    // body data format
    //   {
    //     "restaurant_data": {
    //         "restaurantName": "Tomikawa",
    //         "restaurantAddress": "14191 Jeffrey Rd, Irvine, CA 92620"
    //     },
    //     "cuisineIds": [3]
    //   }
    const restaurantData = req.body.restaurant_data
      
    const columns = {
      restaurantName: 'restaurant_name',
      restaurantAddress: 'restaurant_address'
    }

    try {
      // pull out which columns needed to be inserted and what values
      let columnsToInsert = ""
      let valuesToInsert = ""

      Object.keys(restaurantData).forEach((field, index) => {
        if (index) {
          columnsToInsert += ','
          valuesToInsert += ','
        }
        columnsToInsert += `${columns[field]}`
        valuesToInsert += `'${restaurantData[field]}'`
      })

      // Insert restaurant data into restaurants table
      const insertRestaurantQuery = `INSERT INTO restaurants(${columnsToInsert}) VALUES (${valuesToInsert}) RETURNING *`
      const {rows} = await pool.query(insertRestaurantQuery);

      // pull out restaurant id once restaurant is made
      const restaurantId = rows[0].restaurant_id

      // insert into restaurant_cuisines to link restaurant to cuisine types
      let restaurantCuisineValues = ""
      let cuisineIds = req.body.cuisineIds
      cuisineIds.forEach((cuisineId, index) => {
        if (index) {
          restaurantCuisineValues += ','
        }
        restaurantCuisineValues += `(${restaurantId}, ${cuisineId})`
      })

      const insertIntoRestaurantCuisinesQuery = `INSERT INTO restaurant_cuisines(restaurant_id, cuisine_id) VALUES ${restaurantCuisineValues}`
      await pool.query(insertIntoRestaurantCuisinesQuery);

      return res.status(200).json(rows)
    }
    catch (err) {
      return res.status(500).json({ message: err.message })

    }
  }

  module.exports = {
    getAllRestaurants,
    getRestaurantById,
    createRestaurant
  }