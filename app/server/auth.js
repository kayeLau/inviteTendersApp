import { promisify } from '../utils/util'
import { http } from './api'

export function login () {
  console.log('登录')
  return promisify(wx.login)().then(({code}) => {
    console.log(`code: ${code}`)
    return http.post('/users/login', {
      code,
      type: 'wxapp'
    })
  })
}

function getUserInfo () {
  return http.get('/users/info').then(response => {
    let data = response.data
    if (data && typeof data === 'object') {
      // 获取用户信息成功则保存到全局
      wx.setStorageSync('userInfo', data)
      // app.globalData.userInfo = data
      return data
    }
    return Promise.reject(response)
  })
}

export function checkSession() {
  promisify(wx.checkSession)().then(() => {
    console.log('session 生效')
    return getUserInfo()
  }).then(userInfo => {
    console.log('登录成功', userInfo)
  }).catch(err => {
    console.log('自动登录失败, 重新登录', err)
    return login()
  }).catch(err => {
    console.log('手动登录失败', err)
  })
}