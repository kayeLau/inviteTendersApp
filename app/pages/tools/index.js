import {
  http
} from '../../server/api'

Page({
  data: {
    avatarUrl: '',
    currentPlace: '',
    visiable: false,
    siteList: [],
    triggered: false,
    role: [{
        name: '设置工地',
        icon: '../../assert/hook.png',
        id: 'site-boss',
        path: 'toolSite'
      },
      {
        name: '人员管理',
        icon: '../../assert/workers.png',
        id: 'stuff-manager-boss',
        path: 'toolStaff'
      },
      {
        name: '考勤记录',
        icon: '../../assert/under-construction.png',
        id: 'records-boss',
        path: 'toolAttendance'
      },
      {
        name: '记录',
        icon: '../../assert/hook.png',
        id: 'records-boss',
        path: 'toolSite'
      }
    ]
  },
  jumpTo(event) {
    const id = event.currentTarget.dataset.id
    const path = event.currentTarget.dataset.path
    wx.navigateTo({
      url: `/pages/${path}/index?id=${id}&path=${path}`
    })
  },

  bindchooseavatar(e) {
    const avatarUrl = e.detail.avatarUrl
    console.log("avatarUrl", avatarUrl)
    this.setData({
      avatarUrl
    })
  },

  async openSiteSelector() {
    await this.getPlaceInfo()
    this.setData({
      visiable: true
    })
  },

  async getPlaceInfo() {
    let params = {
      size: 999,
      page: 1
    }
    await http.post('/accountingPlace/getAccountingPlaceList', params).then(res => {
      if (res.data.success) {
        let siteList = res.data.resource.filter(item => item.state === 0)
        const userInfo = wx.getStorageSync('userInfo')
        const currentPlace = siteList.find(item => item.id === userInfo.current_place_id)
        this.setData({
          triggered: false,
          siteList,
          currentPlace: currentPlace ? currentPlace.place_name : ''
        })
      }
    })
  },

  setCurrentPlace(e){
    let current_place_id = e.currentTarget.dataset.pid
    http.post('/users/updateUserinfo', {current_place_id}).then(res => {
      if(res.data.success){
        wx.setStorageSync('userInfo', res.data)
        const currentPlace = this.data.siteList.find(item => item.id === res.data.current_place_id)
        this.setData({
          currentPlace: currentPlace ? currentPlace.place_name : '',
          visiable:false
        })
      }
    })
  },

  onLoad: function () {
    this.getPlaceInfo()
  }

});