const db = require('./connection_db')

function checkRepeated(table, key, value) {
    let result = {}
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM ${table} where ${key} = ?`, [value], (err, row) => {
            if (err) {
                result.msg = "server error,please try again"
                result.success = false
                reject(result)
                console.log(err)
                return
            }

            if (row.length >= 1) {
                result.msg = key + " always exist"
                result.success = false
                reject(result)
            } else {
                result.msg = "success"
                result.success = true
                resolve(result)
            }
        })
    })
}

function createNew(table, data) {
    let result = {}
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO ${table} SET ?`, [data], (err) => {
            if (err) {
                result.msg = "server error,please try again"
                result.success = false
                console.log(err)
                reject(result)
                return
            }
            result.msg = "success"
            result.success = true
            resolve(result)
        })
    })
}

function updateItem(table, data, key, value) {
    let result = {}
    return new Promise((resolve, reject) => {
        db.query(`UPDATE ${table} SET ? where ${key} = ?`, [data, value], (err) => {
            if (err) {
                result.msg = "server error,please try again"
                result.success = false
                console.log(err)
                reject(result);
                return
            }
            result.msg = "update success"
            result.success = true
            resolve(result);
        })
    })
}

function deleteItem(table, key, value) {
    let result = {}
    return new Promise((resolve, reject) => {
        db.query(`DELETE FROM ${table} where ${key} = ?`, [value], (err) => {
            if (err) {
                result.msg = "server error,please try again"
                result.success = false
                console.log(err)
                reject(result);
                return
            }
            result.msg = "delete success"
            result.success = true
            resolve(result);
        })
    })
}

// @params
function optionsSQLFromatter(options,table) {
    let whereClause = ''
    for (const key in options) {
        if (options.hasOwnProperty(key)) {
            if (options[key] === null || options[key] === undefined || options[key] === '') continue;
            let query
            switch (key) {
                case 'update_time':
                    query = `${key} BETWEEN '${options[key][0]}' AND '${options[key][1]}'`
                    break
                case 'release_time':
                    query = `${key} BETWEEN '${options[key][0]}' AND '${options[key][1]}'`
                    break
                case 'bid_title':
                    query = `${key} LIKE '%${options[key]}%'`
                    break
                case 'orderShopId':
                    query = Array.isArray(options[key]) ? 
                        options[key].reduce((accumulator, currentValue, index) => index === 0 ? `orderShopId = '${currentValue}'` : `${accumulator} OR orderShopId = '${currentValue}'`, '')
                        : `${key} = '${options[key]}'`;
                    break
                default:
                    query = Array.isArray(options[key]) ? 
                    options[key].reduce((accumulator, currentValue, index) => index === 0 ? `${table}.${key} = '${currentValue}'` : `${accumulator} OR ${table}.${key} = '${currentValue}'`, '')
                    : `${table}.${key} = '${options[key]}'`;
            }

            if (whereClause === '') {
                whereClause += ` WHERE ${query}`;
            } else {
                whereClause += ` AND ${query}`;
            }
        }
    }
    return whereClause
}

function getItems({ table, options, size, page, orderby = 'update_time', sort = 'DESC', join , columns }) {
    let result = {}
    return new Promise((resolve, reject) => {
        let optionsSQL = optionsSQLFromatter(options,table)
        db.query(`SELECT COUNT(*) AS total FROM ${table} ${optionsSQL}`, (err, rows) => {
            if (err) {
                result.msg = "server error, please try again";
                result.success = false;
                reject(result);
                return;
            }
            result.total = rows[0].total || 0;
        })
        let defaultColumns = `* , DATE_FORMAT(${table}.update_time,'%Y-%m-%d %H:%i:%S') AS update_time`
        db.query(`SELECT ${ columns ? columns : defaultColumns } FROM ${join ? join : table} ${optionsSQL} ORDER BY ${table}.${orderby} ${sort} 
        LIMIT ${size} OFFSET ${(page - 1) * size}`, (err, rows) => {
            if (err) {
                result.msg = "server error,please try again"
                result.success = false
                console.log(err)
                reject(result);
                return
            }
            result.msg = "get success"
            result.resource = rows
            result.success = true
            resolve(result);
        })
    })
}

function getItem(table, options) {
    let result = {}
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM ${table} where ?`, [options], (err, rows) => {
            if (err) {
                result.msg = "server error,please try again"
                result.success = false
                reject(result);
                return
            }
            result.msg = "get success"
            result.resource = rows
            result.success = true
            resolve(result);
        })
    })
}

function customQuery(query, options = []) {
    let result = {}
    return new Promise((resolve, reject) => {
        db.query(query, options, (err, rows) => {
            if (err) {
                console.log(err)
                result.msg = "server error,please try again"
                result.success = false
                logger.info(err);
                reject(result);
                return
            }
            result.msg = "get success"
            result.resource = rows
            result.success = true
            resolve(result);
        })
    })
}

module.exports = { checkRepeated, createNew, updateItem, deleteItem, getItems, getItem, optionsSQLFromatter , customQuery }