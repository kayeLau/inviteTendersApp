import { config } from '../../assert/config.js';
import { http } from '../../server/api'

Page({
  data: {
    activeTab:1,
    id:'',
    path:'',
    config: [],
  },

  getPlaceInfo() {
    const userInfo = wx.getStorageSync('userInfo')
    let params = {
      create_user_id:userInfo.id,
      size:999,
      page:1
    }
    http.post('/accountingPlace/getAccountingPlaceList',params).then(res => {
      if(res.data.success){
        console.log(res)
      }
    })
  },

  createPlaceInfo() {
    let data = this.selectComponent ("#xl-form").getData()
    const userInfo = wx.getStorageSync('userInfo')
    let params = {
      create_user_id:userInfo.id,
      place_name:data.place_name,
      attendance_time:data.attendance_time,
      attendance_unit:data.attendance_unit,
    }
    http.post('/accountingPlace/createAccountingPlace',params).then(res => {
      if(res.data.success){
        console.log(res)
      }
    })
  },

  onLoad: function(option){
    this.setData({
      'id':option.id,
      'path':option.path,
      'config':config[option.id]
    })
    this.getPlaceInfo()
  }
});