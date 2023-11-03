// app.js
import { login , getUserInfo} from './server/api.js';
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    login()
    // getUserInfo()
  },

  globalData: {
    userInfo: null
  },
})
