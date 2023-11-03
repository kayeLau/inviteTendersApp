// const loginCheck = require('../models/login')
const { toRegister, getUsersItemById } = require('../models/register_model')
var { getCurrentTime } = require('../utils')
const { generateUUID, hashPassword } = require('../models/encryption');
const config = require('../config/development_config')
const axios = require('axios');


module.exports = class Member {
  // 註冊
  postRegister(req, res, next) {
    const password = hashPassword(req.body.password);

    const memberData = {
      id: generateUUID(),
      name: req.body.name,
      password,
      auth: req.body.auth,
      shopId: req.body.shopId,
      shopName: req.body.shopName,
      createDate: getCurrentTime(),
      updateDate: getCurrentTime(),
    }

    toRegister(memberData).then(result => {
      res.json(result)
    })
  }

  getUserInfo(req, res, next) {
    if (req.user) {
      return res.send({
        code: 0,
        data: req.user
      })
    }
    throw new Error('用户未登录')
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
              console.log(result)
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
        }).then(() => {
          res.json({ code: 0 })
        }).catch(err => {
          console.log(err)
          res.json({ code: 500 })
        })
    } else {
      throw new Error('未知的授权类型')
    }
  }
}