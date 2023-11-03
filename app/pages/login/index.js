const app = getApp()
Page({
data: {
  show: false, // 登录弹窗是否显示
  selected: true,  // 是否勾选授权
  loginSuccess: undefined,
  loginFail: undefined,
},

  // 确认授权手机号-这里可以做节流操作，防止用户点击次数过多，为了便于演示，这里未做节流
  async handleConfirm(data) {
    const {selected} = this.data
    // 用户未勾选，提示请勾选
    if(!selected){
      wx.showToast({
        title: '请同意《用户隐私协议》',
        icon: 'none'
      })
      return
    }
    // data.detail.code就是获取手机号的动态令牌
    let info = data.detail
    let fail = this.data.loginFail
    if (info.code) {
      // info.code就是手机号动态令牌
      
      /**新版本微信小程序不需要提前调用wx.login进行登录，这里的写法是为了实配老版本，在获取手机号授权登录之前先调用wx.login
         这里的app.globalData.userInfo为全局挂载的userInfo，关于userInfo的解释在本文下方
      */
      /* 使用awiat阻塞进程 */
      await app.globalData.userInfo._getLoginCode()  // wx.login登录
      // 调用了wx.login后进入下一步
      
      this.setPhoneInfo(info)  // 绑定手机号-获取手机号授权用户登录功能
    } else {
      fail && fail(info)
    }
  },
  

// 绑定手机号-获取手机号授权用户登录功能
setPhoneInfo(data) {
let success = this.data.loginSuccess
let fail = this.data.loginFail
// data.jsCode保存通过login获取的code
data.jsCode = app.globalData.userInfo.code
// 手机号动态令牌
data.phoneCode = data.code 
// 调用用户登录接口，removeNull其实是一个封装的方法， 用来去掉空格，本质就是传了一个data
getLoginSession(removeNull(data)).then(async res => {
  // then为登录成功，存入token
  wx.setStorageSync('token', res.data)
  // 手机号授权算登录成功
  success && success()
  // 设置全局userInfo属性,isLogin = true，表示登录成功
  app.globalData.userInfo.isLogin = true
  // 清除等待列表
  wx.queue.asyncExe("login_back")
  // 调用全局的_getUserInfo方法,传入'login'参数
  await app.globalData.userInfo._getUserInfo('login')
  // 关闭弹框
  this.hideLogin()
}).catch(async e => {
  if (e.data.indexOf("已绑定") > -1) {
    success && success()
    wx.setStorageSync("token", e.data)
    await app.globalData.userInfo._getUserInfo('login')
  } else {
    fail && fail()
  }
  // 关闭弹框
  this.hideLogin()
})
},

// 关闭弹框
hideLogin() {
    // 关闭弹框
    this.setData({
      show: false
    }, () => {
      if (isPopup()) {
        // 显示tabbar()
        setTimeout(() => {
          this.getTabBar().show()
        }, 300)
      }
    })
}
})