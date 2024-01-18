const { verifyToken } = require('../models/verification')
const authMap = {

}

async function auth(req, res, next) {
    const token = req.headers['token'];
    if(req.path === '/users/login'){
        next()
        return
    }
    await verifyToken(token, true).then(tokenResult => {
        console.log(tokenResult)
        if (tokenResult.success === true) {
            const open_Id = tokenResult.data.split('|')[0]
            req.open_Id = open_Id
            req.userInfo = tokenResult.userInfo
            next()
        } else {
            res.json(tokenResult)
        }
    })
}

module.exports = auth