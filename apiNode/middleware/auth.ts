import { verifyToken } from '../models/verification'
const authMap = {

}

async function auth(req, res, next) {
    const token = req.headers['token'];
    if(req.path === '/users/login'){
        next()
        return
    }
    await verifyToken(token, true).then(tokenResult => {
        if (tokenResult.success === true) {
            req.userInfo = tokenResult.userInfo
            next()
        } else {
            res.json(tokenResult)
        }
    })
}

module.exports = auth