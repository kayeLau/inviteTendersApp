// const loginCheck = require('../models/login')
// var { getCurrentTime } = require('../utils')
// const { generateUUID, hashPassword } = require('../models/encryption');
const { verifyToken } = require('../models/verification')
const { toRegister, getUsersItemById } = require('../models/register_model')
const config = require('../config/development_config')
const axios = require('axios');
const jwt = require('jsonwebtoken');


module.exports = class Member {
  // 获取用戶
  getUserInfo(req, res, next){
    const token = req.headers['token']
    console.log(token)
    verifyToken(token).then(result => {
      const open_Id = result.data.split('|')[0]
      if(result.success){
        getUsersItemById({ open_Id: open_Id }).then(result => {
          if (result.success) {
            let user = result.resource[0]
            res.json(user)
          }
        })
      }else{
        res.json({ code: 500 })
      }
    }).catch(() => res.json({ code: 500 }))
  }

  // 登入
  postLogin(req, res, next) {
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
              user = result.resource[0]
            }
          })
          return user
        }).then(user => {
          if (!user) {
            user = {
              open_Id: openId,
              session_key: sessionKey
            }
            toRegister(user).then(result => {
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
          res.json({ code: 0 , token })
        }).catch(err => {
          console.log(err)
          res.json({ code: 500 })
        })
    } else {
      throw new Error('未知的授权类型')
    }
  }
}