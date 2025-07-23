import { verifyToken, verifyaAuth } from '../models/verification'

async function auth(req, res, next) {
    const token = req.headers['token'];
    const path = req.path
    if(req.path === '/users/login'){
        next()
        return
    }

    await verifyToken(token, true).then(tokenResult => {
        if (tokenResult.success === true) {
            req.userInfo = tokenResult.userInfo
        } else {
            res.json(tokenResult)
        }
    })

    const auth = req.userInfo ? req.userInfo.auth : 0

    await verifyaAuth(path,auth).then(tokenResult => {
        if (tokenResult.success === true) {
            next()
        } else {
            res.json(tokenResult)
            return
        }
    })
}

module.exports = auth