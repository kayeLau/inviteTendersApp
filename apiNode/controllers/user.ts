import { registerUser, getUsersItemById, updateUser } from '../models/user';
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
      id:userInfo.id,
      success: true
    })

  }

  async updateUserinfo(req, res, next) {
    const userInfo = req.userInfo
    const data = { currentPlaceId: req.body.currentPlaceId }
    
    await updateUser(userInfo.id, data).then(result => {
      res.json(result)
    }).catch(err => {
      next(err)
    })
  }


  async login(req, res, next) {
    try {
      const params = req.body;
      const { code, type } = params;

      if (type === 'wxapp') {
        const wxParams = {
          appid: config.wxAppId,
          secret: config.wxAppSecret,
          js_code: code,
          grant_type: 'authorization_code'
        };

        // 獲取微信 session
        const { data: { openid, session_key } } = await axios.get('https://api.weixin.qq.com/sns/jscode2session', { params: wxParams });

        // 查詢用戶
        const userResult = await getUsersItemById({ openId: openid });
        let user = userResult.success ? userResult : null;

        // 如果用戶不存在則註冊新用戶
        if (user.data === null) {
          const registerResult = await registerUser({
            openId: openid,
            sessionKey: session_key
          });
          if (registerResult.success) {
            console.log('新用户', user);
          }
        } else {
          console.log('老用户', user);
        }

        // 生成 token
        const token = jwt.sign({ data: openid }, config.secret, { expiresIn: '6h' });

        // 設置響應頭和返回結果
        res.set('set-token', token);
        res.set('Access-Control-Expose-Headers', 'set-token');
        res.json({ success: true, token , ...user });
      } else {
        throw new Error('未知的授权类型');
      }
    } catch (err) {
      console.log(err);
      res.json({ success: false });
    }
  }
}