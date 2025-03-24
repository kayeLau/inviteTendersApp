Page({
  data:{
    roleVisible:false,
    placeVisible:false,
    currentPlace: '',
    currentRole: 1,
    currentRoleImage:'../../assert/construction-worker.png',
    roleMap: {
      1:'工人',
      2:'工头',
      3:'老板'
    },
    role:[
      {
        name:'工人记账',
        id:1,
        icon:'../../assert/construction-worker.png'
      },
      {
        name:'带班记账',
        id:2,
        icon:'../../assert/engineer.png'
      },
      {
        name:'老板记账',
        id:3,
        icon:'../../assert/boss.png'
      }
    ]
  },
  
  changeRole(event){
    this.triggerEvent('changeRole', { 
      id: event.currentTarget.dataset.id,
      icon:event.currentTarget.dataset.icon
    });
  },

  async openSiteSelector() {
    await this.getPlaceInfo()
    this.setData({ placeVisible: true })
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
    this.setData({ roleVisible: true })
  },

});