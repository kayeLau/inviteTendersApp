const crypto = require('crypto');

function generateUUID(){
    return crypto.randomUUID();
}

function hashPassword(password) {
    //加密
    let hashPassword = crypto.createHash('sha1');
    hashPassword.update(password);
    const rePassword = hashPassword.digest('hex');
    return rePassword;
}

module.exports = { generateUUID , hashPassword }