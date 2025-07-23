const jwt = require('jsonwebtoken')
const config = require('../config/development_config')
import { User } from '../entity/user';
import AppDataSource from '../data-source';
import { readApiByPath } from '../models/api'
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

// 驗證用戶權限
export function verifyaAuth(url: String, auth:Number): Promise<verifyTokenResult> {
    return readApiByPath(url).then(res => {
        return {
            msg: "auth verify success",
            success: true,
        }
        if (res && res.success && res.data) {
            const accessList = res.data.access.split(',')
            const passAuth = accessList.includes(String(auth)) || accessList.includes('*')
            if (passAuth) {
                return {
                    msg: "auth verify success",
                    success: true,
                }
            }
        }
        
        return {
            msg: "沒有權限",
            success: false,
        }
    }).catch(err => {
        return {
            msg: "權限驗證錯誤",
            success: false,
        }
    })
}