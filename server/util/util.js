
/**
 * Function to generate an object with a string for columns to insert into a table, and the values to insert
 * Used when generating queries when you need to only insert certain columns
 * @param data object containing values
 * @param columns object containing the column names
 * @return returns object with structure of
 *  {
 *      columnsToInsert: "",
 *      valuesToInsert: ""
 *  }
 */
const getInsertQueryColumnsAndValues = (data, columns) => {
    let columnsToInsert = ""
    let valuesToInsert = ""

    Object.keys(data).forEach((field, index) => {
        if (index) {
          columnsToInsert += ','
          valuesToInsert += ','
        }
        columnsToInsert += `${columns[field]}`

        // check the type of the data and format accordingly
        let updateData = data[field]
        switch (typeof(updateData)) {
            case "number":
                valuesToInsert += `${data[field]}`
                break;
            case "string": 
                valuesToInsert += `'${data[field]}'`
        }
    })

    return { columnsToInsert, valuesToInsert }
}

/**
 * Function to generate a string for updating a table within database
 * Used when generating a query for update
 * @param data object containing values
 * @param columns object containing the column names
 * @return returns string
 */
const getFormattedUpdateString = (data, columns) => {
    let updateString = ""
    Object.keys(data).forEach((field, index) => {
        if (index) {
            updateString += ','
        }
        let updateData = data[field]
        switch (typeof(updateData)) {
            case "number":
                updateString += `${columns[field]} = ${updateData}`
                break;
            case "string":
                updateString += `${columns[field]} = '${updateData}'`
        }
    })

    return updateString
}

/**
 * Function to generate a string for insert statements into a junction table
 * @param mainId the id that needs to be linked to a list of other ids
 * @param ids list of ids to link mainId to
 * @return returns string
 */
const getInsertIntoStringForJunctionTables = (mainId, ids) => {
    let insertString = ""
    ids.forEach((id, index) => {
    if (index) {
        insertString += ','
    }
    insertString += `(${mainId}, ${id})`})

    return insertString;
}

module.exports = {
    getFormattedUpdateString,
    getInsertQueryColumnsAndValues,
    getInsertIntoStringForJunctionTables
  }