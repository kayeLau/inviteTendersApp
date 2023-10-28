const db = require('./connection_db')

module.exports = function loginCheck(memberData){
    return new Promise((resolve,reject)=>{
        db.query('SELECT * FROM member_info where name = ? AND password = ?',[memberData.name,memberData.password],(err,row)=>{
            if(err){
                result.status = "登入失敗。"
                result.err = "伺服器錯誤，請稍後在試！"
                reject(result);
                return;
            }
            resolve(row);
        })
    })
}