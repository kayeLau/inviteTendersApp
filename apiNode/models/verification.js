const config = require('../config/development_config')
const jwt = require('jsonwebtoken');

function verifyToken(token){
    let tokenResult = {
        status: "token verify fail",
        success: false
    }
    const time = Math.floor(Date.now() / 1000);
    return new Promise((resolve) => {
        if(token){
            jwt.verify(token,config.secret,(err,decode)=>{
                console.log(decode)
                if(!err && decode.exp > time){
                    tokenResult = {
                        data:decode.data,
                        status: "token verify success",
                        success: true
                    }
                }
                resolve(tokenResult);
            })
        }else{
            resolve({
                status: "token not exist",
                success: false
            });
        }
    })
}

module.exports = { verifyToken }