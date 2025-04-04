import http from '@chunpu/http';
import { promisify } from '../utils/util'
const baseURL = 'http://localhost:3000'

http.init({
  baseURL, // 定义 baseURL, 用于本地测试
  wx, // 标记是微信小程序用
  timeout: 1000 * 20
})

http.interceptors.response.use(response => {
  var { headers } = response
  var token = headers['set-token'] || ''
  if (token) {
    wx.setStorageSync('token', token)
  }
  return response
})

http.interceptors.request.use(config => {
  // 给请求带上 cookie
  if (config.url === baseURL + '/users/login') return config;
  return promisify(wx.getStorage)({ key: 'token' })
    .then(res => {
      if (res && res.data) {
        Object.assign(config.headers, { token: res.data })
      }
      console.log(config)
      return config
    }).catch((err) => {
      console.log(err)
      return err
    })
})

function uploadImg(files) {
  const user = wx.getStorageSync('userInfo')
  const token = wx.getStorageSync('token')
  const uploadPromises = files.map(file => {
    return new Promise((resolve, reject) => {
      wx.uploadFile({
        url: 'http://localhost:3000/file/writeFile',
        filePath: file.url,
        name: 'file',
        formData: {
          id: user.id
        },
        header: {
          'token': token,
          'user-id': user.id
        },
        success: (res) => {
          const data = JSON.parse(res.data);
          resolve(data)
        },
        fail: (err) => {
          console.error('上传失败:', err);
          reject(err)
        }
      })
    })
  })
  return Promise.all(uploadPromises);
}

function downloadImg(paths) {
  const token = wx.getStorageSync('token')
  const downloadPromise = paths.map(path => {
    return new Promise((resolve, reject) => {
      wx.downloadFile({
        url: 'http://localhost:3000/file/' + path,
        header: {
          'token': token,
        },
        success: (res) => {
          resolve(res.tempFilePath)
        },
        fail: (error) => {
          console.error('Download failed:', error);
        }
      });
    })
  })
  return Promise.all(downloadPromise);
}

module.exports = {
  http,
  uploadImg,
  downloadImg
}