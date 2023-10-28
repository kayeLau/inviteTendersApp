const db = require('./connection_db')
const { checkRepeated, createNew , updateItem , getItems} = require('./base_model')

function toRegister(memberData) {
    return checkRepeated("member_info","name",memberData.name)
        .then(() => createNew("member_info",memberData))
        .catch(err => err)
}

function updateUserInformation(id,data){
    return updateItem("member_info",data,'id',id)
}

function getUsersItems(options, size, page) {
    return getItems("member_info", options, size, page)
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

module.exports = { toRegister , updateUserInformation , getUsersItems}