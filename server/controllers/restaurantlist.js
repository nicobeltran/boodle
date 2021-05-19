const pool = require('../db/database')
const util = require('../util/util')

  /**
   * Function to get restaurant lists of user id
   * @param req
   * @param res
   * @return restaurant lists of user
   */
    const getRestaurantListsByUserId = async (req, res) => {
        try {
            let userId = req.params.userId
            const query = `SELECT restaurant_list.restaurant_list_id, list_name, created_by_id, created_on 
                            FROM users_restaurantlist
                            INNER JOIN restaurant_list ON users_restaurantlist.restaurant_list_id = restaurant_list.restaurant_list_id
                            WHERE users_restaurantlist.user_id = ${userId};`

            const {rows} = await pool.query(query);
            return res.status(200).json({ restaurant_lists: rows })
        } catch (err) {
        return res.status(500).json({ message: err.message})
        }
    }

    /**
   * Function to create a new restaurant list
   * @param req
   * @param res
   * @return restaurant lists of user
   */
    const createRestaurantList = async (req, res) => {
        try {
            const columns = {
                listName: 'list_name',
                createdById: 'created_by_id'
            }
            const colsAndValues = util.getInsertQueryColumnsAndValues(req.body.restaurantListData, columns)

            const query = `INSERT INTO restaurant_list(${colsAndValues.columnsToInsert}) VALUES (${colsAndValues.valuesToInsert});`
            const {rows} = await pool.query(query);
            return res.status(200).json({ rows })
        } catch (err) {
            return res.status(500).json({ message: err.message})
        }
    }

    /**
   * Function to create a new restaurant list
   * @param req
   * @param res
   * @return restaurant lists of user
   */
    const updateRestaurantListName = async (req, res) => {
        try {
            const restaurantListId = req.params.restaurantListId
            const updatedData = req.body
            const query = `UPDATE restaurant_list SET list_name = '${updatedData.restaurantListName}' WHERE restaurant_list_id = ${restaurantListId};`
            const {rows} = await pool.query(query);
            return res.status(200).json({ rows })
        } catch (err) {
            return res.status(500).json({ message: err.message})
        }
    }

     /**
   * Function to create a new restaurant list
   * @param req
   * @param res
   * @return restaurant lists of user
   */
      const deleteRestaurantList = async (req, res) => {
        try {
            const restaurantListId = req.params.restaurantListId
            const query = `DELETE FROM restaurant_list WHERE restaurant_list_id = ${restaurantListId};`
            const {rows} = await pool.query(query);
            return res.status(200).json({ rows })
        } catch (err) {
            return res.status(500).json({ message: err.message})
        }
    }

  module.exports = {
      getRestaurantListsByUserId,
      createRestaurantList,
      updateRestaurantListName,
      deleteRestaurantList
  }