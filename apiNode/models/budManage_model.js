const { checkRepeated, createNew , updateItem , deleteItem , getItems } = require('./base_model')
const db = require('./connection_db')

function createNewBud(data) {
    return checkRepeated("bud_info","bud_title",data.bud_title)
        .then(() => createNew("bud_info",data))
        .catch(err => err)
}

function updateBudInformation(id,data){
    return updateItem("bud_info",data,'bud_id',id)
}

function deleteBudItem(id){
    return deleteItem("bud_info",'bud_id',id)
}

function getBudItems(options,size,page){
    return getItems("bud_info",options,size,page)
}

function insertBudItems(list) {
    let result = {}
    result.success = false
    return new Promise((resolve, reject) => {
        if (Array.isArray(list) && Array.isArray(list[0])) {
            db.query(`INSERT IGNORE INTO bud_info (
            bud_id,
            bud_title,
            bud_body,
            bud_table,
            release_time,
            bud_unit,
            bud_type,
            pj_type,
            bud_city,
            bud_contact,
            bud_amount,
            data_source,
            data_href,
            update_time) VALUES ? `, [list] , (err) => {
                if (err) {
                    result.msg = "server error,please try again"
                    reject(result)
                    console.log(err)
                    return
                }
                result.msg = "success"
                result.success = true
                resolve(result)
            })
        }else{
            result.msg = "unexp"
            reject(result)
        }
    })
}

module.exports = { getBudItems , createNewBud , updateBudInformation , deleteBudItem , insertBudItems}