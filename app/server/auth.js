import { promisify } from '../utils/util'
import { http } from './api'

export function login () {
  return promisify(wx.login)().then(({code}) => {
    return http.post('/users/login', {
      code,
      type: 'wxapp'
    })
  })
}

function getUserInfo () {
  return http.get('/users/getUserInfo').then(response => {
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

export async function autoLogin() {
  await login()
  await getUserInfo()
//   const session = await promisify(wx.checkSession)()
//   if(session.errMsg === "checkSession:ok"){
//       const userinfo = await getUserInfo()
//       if(!userinfo.success){
//         await login()
//       }
//   }

}