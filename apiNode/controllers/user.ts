import { registerUser, getUsersItemById, updateUser } from '../models/user_model';
const config = require('../config/development_config')
const axios = require('axios');
const jwt = require('jsonwebtoken');

interface userInfo {
  name: string
  current_placeId: number
  phone: string
}

module.exports = class Member {
  // 获取用戶
  getUserInfo(req, res, next) {
    const userInfo = req.userInfo
    res.json({
      name: userInfo.name,
      current_placeId: userInfo.current_placeId,
      phone: userInfo.phone,
      success: true
    })

  }

  async updateUserinfo(req, res, next) {
    const userInfo = req.userInfo
    const data = { current_placeId: req.body.current_placeId }

    await updateUser(userInfo.id, data).then(result => {
      res.json(result)
    }).catch(err => {
      next(err)
    })
  }

  // 登入
  login(req, res, next) {
    var params = req.body
    var { code, type } = params
    if (type === 'wxapp') {
      const params = {
        appid: config.wxAppId,
        secret: config.wxAppSecret,
        js_code: code,
        grant_type: 'authorization_code'
      }
      let openId = null
      let sessionKey = null

      axios.get('https://api.weixin.qq.com/sns/jscode2session', { params }).then(async ({ data }) => {
          openId = data.openid
          sessionKey = data.sessionKey
          let user = null
          await getUsersItemById({ openId: openId }).then(result => {
            if (result.success) {
              user = result
            }
          })
          return user
        }).then(user => {
          if (!user) {
            user = {
              openId: openId,
              sessionKey: sessionKey
            }
            registerUser(user).then(result => {
              if (result.success) {
                console.log('新用户', user)
              }
            })
          } else {
            console.log('老用户', user)
          }
          const token = jwt.sign({ data: user.openId + '|' + user.sessionKey }, config.secret, { expiresIn: '6h' });
          return token
        }).then(token => {
          res.set('set-token', token);
          res.set('Access-Control-Expose-Headers', 'set-token')
          res.json({ success: true, token })
        }).catch(err => {
          console.log(err)
          res.json({ success: false })
        })
    } else {
      throw new Error('未知的授权类型')
    }
  }
}