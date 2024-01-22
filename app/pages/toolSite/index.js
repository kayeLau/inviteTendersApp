import {
  config
} from '../../assert/config.js';
import {
  http
} from '../../server/api'

Page({
  data: {
    isEdit: false,
    siteList: [], // 我的工地列表
    endSiteList: [], // 结束的工地列表
    activeTab: 0,
    tabConfig: [{
        title: '进行中',
      },
      {
        title: '已结束',
      },
    ],
    id: '',
    path: '',
    config: [],
  },

  getPlaceInfo() {
    const userInfo = wx.getStorageSync('userInfo')
    let params = {
      create_user_id: userInfo.id,
      size: 999,
      page: 1
    }
    http.post('/accountingPlace/getAccountingPlaceList', params).then(res => {
      if (res.data.success) {
        let siteList = res.data.resource
        this.setData({
          siteList
        })
      }
    })
  },

  createPlaceInfo() {
    let data = this.selectComponent("#xl-form").getData()
    const userInfo = wx.getStorageSync('userInfo')
    let params = {
      create_user_id: userInfo.id,
      place_name: data.place_name,
      attendance_time: data.attendance_time,
      attendance_unit: data.attendance_unit,
    }
    http.post('/accountingPlace/createAccountingPlace', params).then(res => {
      if (res.data.success) {
        this.getPlaceInfo()
        this.setData({
          isEdit: false
        })
      }
    })
  },

  switchToEdit() {
    this.setData({
      isEdit: true
    })
  },

  onLoad: function (option) {
    this.setData({
      'id': option.id,
      'path': option.path,
      'config': config[option.id]
    })
    this.getPlaceInfo()
  }
});