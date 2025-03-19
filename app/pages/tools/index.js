import {
  http
} from '../../server/api'

Page({
  data: {
    avatarUrl: '',
    currentPlace: '',
    currentRole: 1,
    currentRoleImage:'../../assert/construction-worker.png',
    roleMap: {
      1:'工人',
      2:'工头',
      3:'老板'
    },
    visible: false,
    roleVisible: false,
    siteList: [],
    triggered: false,
    tools: [{
      name: '设置工地',
      icon: '../../assert/hook.png',
      id: 'site-boss',
      path: 'toolSite'
    },
    {
      name: '人员管理',
      icon: '../../assert/workers.png',
      id: 'staff-manager-boss',
      path: 'toolStaff'
    },
    {
      name: '记工',
      icon: '../../assert/note.png',
      id: 'records-boss',
      path: 'toolAttendance'
    },
    {
      name: '考勤记录',
      icon: '../../assert/under-construction.png',
      id: 'records-boss',
      path: 'toolRecord'
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
      visible: true
    })
  },

  async getPlaceInfo() {
    let params = {
      size: 999,
      page: 1
    }
    await http.post('/accountingPlace/getPlaces', params).then(res => {
      if (res.data.success) {
        let siteList = res.data.data.filter(item => item.state === 0)
        const currentPlaceId = wx.getStorageSync('currentPlaceId')
        const currentPlace = siteList.find(item => item.id === currentPlaceId)
        this.setData({
          triggered: false,
          siteList,
          currentPlace: currentPlace ? currentPlace.name : '工地'
        })
      }
    })
  },

  setCurrentPlace(e) {
    let currentPlaceId = e.currentTarget.dataset.pid
    wx.setStorageSync('currentPlaceId', currentPlaceId)
    const currentPlace = this.data.siteList.find(item => item.id === currentPlaceId)
    this.setData({
      currentPlace: currentPlace ? currentPlace.name : '工地',
      visible: false
    })
  },

  showRoleChange(){
    this.setData({
      roleVisible: true,
    })
  },

  changeRole(e) {
    console.log(e)
    this.setData({
      roleVisible: false,
      currentRole: e.detail.id,
      currentRoleImage:e.detail.icon
    })
    wx.setStorage({
      currentRole: e.id
    })
  },

  onLoad: function () {
    this.getPlaceInfo()
  }

});