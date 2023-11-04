// app.js
import { checkSession , login} from './server/auth.js';
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    checkSession()
    // login()
  },

  globalData: {
    userInfo: null,
    currentBudDetail:{}
  },
})
