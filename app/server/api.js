import http from '@chunpu/http';
import { promisify } from '../utils/util'
const baseURL = 'http://localhost:3000'

http.init({
  baseURL, // 定义 baseURL, 用于本地测试
  wx // 标记是微信小程序用
})

http.interceptors.response.use(response => {
  var {headers} = response
  var token = headers['set-token'] || ''
  if (token) {
    wx.setStorageSync('token', token)
  }
  return response
})

http.interceptors.request.use(config => {
  // 给请求带上 cookie
  if(config.url === baseURL + '/users/login')return config;
  return promisify(wx.getStorage)({key: 'token'}).then(res => {
    if (res && res.data) {
      Object.assign(config.headers, {
        token: res.data
      })
    }
    return config
  }).catch((err) => {
    console.log(err)
    return err
  })
})

module.exports = { http }

