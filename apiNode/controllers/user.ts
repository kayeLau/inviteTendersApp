import { registerUser, getUsersItemById, updateUser } from '../models/user_model';
const config = require('../config/development_config')
const axios = require('axios');
const jwt = require('jsonwebtoken');

interface userInfo {
  name: string
  current_place_id: number
  phone: string
}

module.exports = class Member {
  // 获取用戶
  getUserInfo(req, res, next) {
    const userInfo = req.userInfo
    res.json({
      name: userInfo.name,
      current_place_id: userInfo.current_place_id,
      phone: userInfo.phone,
      success: true
    })

  }

  async updateUserinfo(req, res, next) {
    const userInfo = req.userInfo
    const data = { current_place_id: req.body.current_place_id }

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

      axios.get('https://api.weixin.qq.com/sns/jscode2session', { params })
        .then(async ({ data }) => {
          openId = data.openid
          sessionKey = data.session_key
          let user = null
          await getUsersItemById({ open_Id: openId }).then(result => {
            if (result.success) {
              user = result
            }
          })
          return user
        }).then(user => {
          if (!user) {
            user = {
              open_Id: openId,
              session_key: sessionKey
            }
            registerUser(user).then(result => {
              if (result.success) {
                console.log('新用户', user)
              }
            })
          } else {
            console.log('老用户', user)
          }
          const token = jwt.sign({ data: user.open_Id + '|' + user.session_key }, config.secret, { expiresIn: '6h' });
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