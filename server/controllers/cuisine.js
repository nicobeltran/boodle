const pool = require('../db/database')
// const util = require('../util/util')

const getAllCuisineTypes = async(req,res) => {
    try {
        const query = "SELECT * FROM cuisine_types;"
        const {rows} = await pool.query(query);
        return res.status(200).json({ cuisine_types: rows })
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const createNewCuisineType = async (req, res) => {
    try {
        let cuisineName = req.body.cuisine_data.cuisine_name
        const insertCuisineQuery = `INSERT INTO cuisine_types(cuisine_name) VALUES ('${cuisineName}') RETURNING *`
        const {rows} = await pool.query(insertCuisineQuery);
        return res.status(200).json({rows})
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

module.exports = {
    getAllCuisineTypes,
    createNewCuisineType
}