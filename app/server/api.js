import http from '@chunpu/http';

http.init({
  baseURL: 'http://localhost:3000', // 定义 baseURL, 用于本地测试
  wx // 标记是微信小程序用
})

const BASE_URL = 'http://localhost:3000';

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

export function getUserInfo () {
  return http.get('/users/info').then(response => {
    let data = response.data
    if (data && typeof data === 'object') {
      // 获取用户信息成功则保存到全局
      this.globalData.userInfo = data
      return data
    }
    return Promise.reject(response)
  })
}

export const promisify = original => {
  return function(opt) {
    return new Promise((resolve, reject) => {
      opt = Object.assign({
        success: resolve,
        fail: reject
      }, opt)
      original(opt)
    })
  }
}
