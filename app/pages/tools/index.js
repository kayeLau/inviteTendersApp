import {http} from '../../server/api'

Page({
  data:{
    avatarUrl:'',
    currentPlace:'',
    visiable:false,
    siteList:[],
    role:[
      {
        name:'设置工地',
        icon:'../../assert/hook.png',
        id:'site-boss',
        path:'toolSite'
      },
      {
        name:'人员管理',
        icon:'../../assert/workers.png',
        id:'stuff-manager-boss',
        path:'toolTab'
      },
      {
        name:'考勤记录',
        icon:'../../assert/under-construction.png',
        id:'records-boss',
        path:'toolSite'
      },
      {
        name:'记录',
        icon:'../../assert/hook.png',
        id:'records-boss',
        path:'toolSite'
      }
    ]
  },
  jumpTo(event){
    const id = event.currentTarget.dataset.id
    const path = event.currentTarget.dataset.path
    wx.navigateTo({url: `/pages/${path}/index?id=${id}&path=${path}`})
  },

  bindchooseavatar(e) {
    const avatarUrl = e.detail.avatarUrl
    console.log("avatarUrl", avatarUrl)
    this.setData({avatarUrl})
  },

  async openSiteSelector(){
    console.log(888)
    await this.getPlaceInfo()
    this.setData({visiable:true})
  },

  async getPlaceInfo() {
    const userInfo = wx.getStorageSync('userInfo')
    let params = {
      create_user_id: userInfo.id,
      size: 999,
      page: 1
    }
    await http.post('/accountingPlace/getAccountingPlaceList', params).then(res => {
      if (res.data.success) {
        let siteList = res.data.resource.filter(item => item.state === 0)
        const userInfo = wx.getStorageSync('userInfo')
        const currentPlace = siteList.find(item => item.id === userInfo.current_place_id)
        this.setData({
          siteList,
          currentPlace:currentPlace ? currentPlace.place_name : ''
        })
      }
    })
  },

    onLoad:function(){
      this.getPlaceInfo()
    }

});