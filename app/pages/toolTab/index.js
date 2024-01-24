import {
  config
} from '../../assert/config.js';
import {
  http
} from '../../server/api'

Page({
  data: {
    formMode:'',
    isEdit: false,
    siteList: [], // 人员列表
    endSiteList: [], // 离开的人员列表
    activeTab: 0,
    tabConfig: [{
        title: '在场',
      },
      {
        title: '返场',
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
    http.post('/accountingPlaceMember/getAccountingPlaceMemberList', params).then(res => {
      if (res.data.success) {
        let siteList = res.data.resource.filter(item => item.state === 0)
        let endSiteList = res.data.resource.filter(item => item.state === 1)
        this.setData({
          siteList,
          endSiteList
        })
      }
    })
  },

  sumbitPlaceInfo(){
    if(this.data.formMode === 'create'){
      this.createPlaceInfo()
    }else if(this.data.formMode === 'edit'){
      this.updatePlaceInfo()
    }
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
    http.post('/accountingPlaceMember/createAccountingPlaceMember', params).then(res => {
      if (res.data.success) {
        this.getPlaceInfo()
        this.setData({
          isEdit: false
        })
      }
    })
  },

  updatePlaceInfo(){
    let data = this.selectComponent("#xl-form").getData()
    const userInfo = wx.getStorageSync('userInfo')
    let params = {
      id:data.id,
      create_user_id: userInfo.id,
      place_name: data.place_name,
      attendance_time: data.attendance_time,
      attendance_unit: data.attendance_unit,
      state:0,
    }
    http.post('/accountingPlaceMember/updatePlaceMemberInformation', params).then(res => {
      if (res.data.success) {
        this.getPlaceInfo()
        this.setData({
          isEdit: false
        })
      }})
  },

  switchToEdit(e) {
    const formMode = e.currentTarget.dataset.mode
    this.setData({
      isEdit: true,
      formMode
    })
    const currentItem = e.currentTarget.dataset.current
    if(currentItem){
      this.selectComponent("#xl-form").textData(currentItem)
    }
  },

  switchToList(e) {
    this.setData({
      isEdit: false,
    })
  },

  setPlaceInfoState(e){
    const currentItem = e.currentTarget.dataset.current
    const state = e.currentTarget.dataset.state
    let params = Object.assign(
      currentItem,
      {state},
    )
    http.post('/accountingPlaceMember/updatePlaceMemberInformation', params).then(res => {
      if (res.data.success) {
        this.getPlaceInfo()
      }})
  },

  showBottomBtn(){
    this.selectComponent("#xl-bottom-btn").showFrame()
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