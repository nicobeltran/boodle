const pool = require('../db/database')

/**
 * Function to get all users
 * @param req
 * @param res
 * @return list of users
 */
 const getAllUsers = async (req, res) => {
    try {
        const query = 'SELECT * FROM users ORDER BY user_id ASC;';
        const {rows} = await pool.query(query);
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
        const query = `SELECT * FROM users WHERE user_id=${userId};`;
        const {rows} = await pool.query(query);
        return res.status(200).json({ user: rows[0] })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'There was an error. Please try again later' })
    }
  }  

/**
 * Function to create new user
 * @param req
 * @param res
 * @return returns new user data 
 */
  const createNewUser = async (req, res) => {
    try {

        // request body structure
        // {
        //     "email": "jane@gmail.com",
        //     "password": "passwordsrcool",
        //     "firstName": "Jane",
        //     "lastName": "Doe"
        // }
        const email = req.body.email;
        const password = req.body.password;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;

        const query = `INSERT INTO users(email, password, first_name, last_name) 
                        VALUES ('${email}', '${password}', '${firstName}', '${lastName}') 
                        RETURNING *;`
        const {rows} = await pool.query(query)

        const responseData = {
            Done: rows[0]
        }

        res.status(200).json(responseData)
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
  }

/**
 * Function to update user password
 * @param req
 * @param res
 */
  const updateUserPassword = async (req, res) => {
    try {

        // request body structure
        // {
        //     "password": password,
        // }
        const userId = req.params.userId
        const password = req.body.password;
        const query = `UPDATE users 
                        SET password = '${password}'
                        WHERE user_id = ${userId};`
        const {rows} = await pool.query(query)

        res.status(200).json(rows)
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: err.message })
    }
  }

  /**
 * Function to get update user email
 * @param req
 * @param res
 */
   const updateUserEmail = async (req, res) => {
    try {

        // request body structure
        // {
        //     "email": email,
        // }
        const userId = req.params.userId
        const email = req.body.email;

        const query = `UPDATE users 
                        SET email = '${email}'
                        WHERE user_id = ${userId};`
        const {rows} = await pool.query(query)

        res.status(200).json(rows)
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: err.message })
    }
  }

  module.exports = {
      getAllUsers,
      getUserById,
      createNewUser,
      updateUserPassword,
      updateUserEmail
  }