const pool = require('../db/database')

/**
 * Function to get all users
 * @param req
 * @param res
 * @return list of users
 */
 const getAllUsers = async (req, res) => {
    try {
        const readAllQuery = 'SELECT * FROM users;';
        const {rows} = await pool.query(readAllQuery);
        return res.status(200).json({ users: rows })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'There was an error. Please try again later' })
    }
  }

/**
 * Function to get user by id
 * @param req
 * @param res
 * @return returns user with matching id
 */
  const getUserById = async (req, res) => {
    try {
        let userId = req.params.userId
        const getByIdQuery = `SELECT * FROM users WHERE user_id=${userId};`;
        const {rows} = await pool.query(getByIdQuery);
        return res.status(200).json({ user: rows[0] })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'There was an error. Please try again later' })
    }
  }

  

  module.exports = {
      getAllUsers,
      getUserById
  }