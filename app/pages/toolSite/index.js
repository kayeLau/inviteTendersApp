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
    let params = {
      size: 999,
      page: 1
    }
    http.post('/accountingPlace/getPlaces', params).then(res => {
      if (res.data.success) {
        let siteList = res.data.data.filter(item => item.state === 0)
        let endSiteList = res.data.data.filter(item => item.state === 1)
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
    let params = {
      name: data.name,
      attendanceTime: data.attendanceTime,
      attendanceUnit: data.attendanceUnit,
    }
    http.post('/accountingPlace/createPlace', params).then(res => {
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
    let params = {
      id:data.id,
      name: data.name,
      attendanceTime: data.attendanceTime,
      attendanceUnit: data.attendanceUnit,
      state:0,
    }
    http.post('/accountingPlace/updatePlace', params).then(res => {
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
    }else{
      this.selectComponent("#xl-form").textData({
        name: '',
        attendanceTime: 0,
        attendanceUnit: 0,
      })
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
    http.post('/accountingPlace/updatePlace', params).then(res => {
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