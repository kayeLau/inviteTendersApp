const jwt = require('jsonwebtoken')
const config = require('../config/development_config')
import { User } from '../entity/user';
import AppDataSource from '../data-source';
const memberRepository = AppDataSource.getRepository(User);

interface UserInfo {
    name: String,
    openId: String,
    sessionKey:String,
}

interface verifyTokenResult {
    msg: String
    success: Boolean
    userInfo?: UserInfo
}
// @ params
// getUser 是否需要取得用戶資料
export async function verifyToken(token, getUser = false): Promise<verifyTokenResult> {
    const time = Math.floor(Date.now() / 1000);

    if (token) {
        return jwt.verify(token, config.secret, async (err, decode) => {
            if (!err && decode.exp > time) {
                if (getUser) {
                    const userInfo: UserInfo = await memberRepository
                        .createQueryBuilder("user")
                        .where('user.openId = :openId', { openId: decode.data })
                        .getOne()
                    return {
                        msg: "token verify success",
                        success: true,
                        userInfo
                    }
                }
                return {
                    msg: "token verify success",
                    success: true
                }
            } else {
                return {
                    msg: "token verify fail",
                    success: false,
                }
            }
        })
    } else {
        return {
            msg: "token not exist",
            success: false
        }
    }
}