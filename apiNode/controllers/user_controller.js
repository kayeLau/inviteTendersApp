const loginCheck = require('../models/login')
const { toRegister, updateUserInformation, getUsersItems } = require('../models/register_model')
var { getCurrentTime, checkNull } = require('../utils')
const { generateUUID, hashPassword } = require('../models/encryption');
const { verifyToken } = require('../models/verification')
const config = require('../config/development_config')
const jwt = require('jsonwebtoken')

module.exports = class Member {
    // 註冊
    postRegister(req, res, next) {
        const password = hashPassword(req.body.password);

        const memberData = {
            id: generateUUID(),
            name: req.body.name,
            password,
            auth:req.body.auth,
            shopId:req.body.shopId,
            shopName:req.body.shopName,
            createDate: getCurrentTime(),
            updateDate:getCurrentTime(),
        }

        toRegister(memberData).then(result => {
            res.json(result)
        })
    }

    getUserInfo(req, res, next){
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
        var {code, type} = params
        if (type === 'wxapp') {
          // code 换取 openId 和 sessionKey 的主要逻辑
          axios.get('https://api.weixin.qq.com/sns/jscode2session', {
            params: {
              appid: config.appId,
              secret: config.appSecret,
              js_code: code,
              grant_type: 'authorization_code'
            }
          }).then(({data}) => {
            var openId = data.openid
            var user = users[openId]
            if (!user) {
              user = {
                openId,
                sessionKey: data.session_key
              }
              users[openId] = user
              console.log('新用户', user)
            } else {
              console.log('老用户', user)
            }
            req.session.openId = user.openId
            req.user = user
          }).then(() => {
            res.send({
              code: 0
            })
          })
        } else {
          throw new Error('未知的授权类型')
        }
    }
}