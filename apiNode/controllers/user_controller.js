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

    // 登入
    postLogin(req, res, next) {
        const memberData = {
            name: req.body.name,
            password: hashPassword(req.body.password),
            updateDate:getCurrentTime(),
        }
        loginCheck(memberData).then(rows => {
            if (checkNull(rows) === true) {
                res.json({
                        success: false,
                        msg: "請輸入正確的帳號或密碼。"
                })
            } else if (checkNull(rows) === false) {
                const token = jwt.sign({ data: rows[0].id }, config.secret, { expiresIn: '2h' });
                // res.setHeader('token', token);
                res.json({
                        success: true,
                        token,
                        msg: "歡迎 " + rows[0].name + " 的登入！",
                })
            }
        }).catch(err => {
            console.log(err)
        })
    }

    // 更改個人資料
    postUpdateUser(req, res, next) {
        const token = req.headers['token'];
        const memberData = {
            // password: hashPassword(req.body.password),
            createDate: getCurrentTime(),
            auth:req.body.auth,
            shopId:req.body.shopId,
            shopName:req.body.shopName
        }
        
        verifyToken(token).then(tokenResult => {
            if (tokenResult.success === true) {
                const id = tokenResult.data
                // todo:check user auth by sql
                updateUserInformation(id, memberData).then(result => {
                    res.json(result)
                }).catch(err => {
                    res.json(err)
                })
            } else {
                res.json(tokenResult)
            }
        })
    }

    getUsersList(req, res, next){
        const token = req.headers['token'];
        const options = req.body.shopType ? { shopType: req.body.shopType } : {}
        const size = parseInt(req.body.size)
        const page = parseInt(req.body.page)

        verifyToken(token).then(tokenResult => {
            if (tokenResult.success === true) {
                getUsersItems(options,size,page).then(result => {
                    res.json(result)
                }).catch(err => {
                    res.json(err)
                })
            } else {
                res.json(tokenResult)
            }
        })
    }
}