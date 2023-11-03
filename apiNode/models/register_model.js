const db = require('./connection_db')
const { checkRepeated, createNew , updateItem , getItems , getItem} = require('./base_model')

function toRegister(memberData) {
    return checkRepeated("user_info","open_Id",memberData.open_Id)
        .then(() => createNew("user_info",memberData))
        .catch(err => err)
}

function updateUserInformation(id,data){
    return updateItem("user_info",data,'id',id)
}

function getUsersItems(options, size, page) {
    return getItems("user_info", options, size, page)
}

function getUsersItemById(options) {
    return getItem("user_info", options )
}

// function updateUserInformation(id, memberData) {
//     let result = {}
//     return new Promise((resolve, reject) => {
//         db.query('UPDATE member_info SET ? where id = ?', [memberData, id], (err) => {
//             if (err) {
//                 result.msg = "server error,please try again"
//                 result.success = false
//                 reject(result);
//                 return
//             }
//             result.msg = "update success"
//             result.success = true
//             resolve(result);
//         })
//     })
// }

module.exports = { toRegister , updateUserInformation , getUsersItems , getUsersItemById}