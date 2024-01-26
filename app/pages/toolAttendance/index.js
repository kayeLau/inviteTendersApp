import { config } from '../../assert/config.js';
import { http } from '../../server/api'

Page({
  data: {
    formMode:'',
    isEdit: false,
    //search
    dateVisible:false,
    siteVisible:false,
    staffVisible:false,
    searchDate:'2024-01',
    searchSite:'广州',
    searchStaff:'陈大明',
    // config
    id: '',
    path: '',
    config: [],
  },

  getPlaceInfo() {
    let params = {
      size: 999,
      page: 1
    }
    http.post('/accountingPlace/getAccountingPlaceList', params).then(res => {
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
    let params = {
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

  updatePlaceInfo(){
    let data = this.selectComponent("#xl-form").getData()
    let params = {
      id:data.id,
      place_name: data.place_name,
      attendance_time: data.attendance_time,
      attendance_unit: data.attendance_unit,
      state:0,
    }
    http.post('/accountingPlace/updatePlaceInformation', params).then(res => {
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
    const today = this.getToday()
    if(currentItem){
      this.selectComponent("#xl-form").textData(currentItem)
    }else{
      this.selectComponent("#xl-form").textData({
        record_time: today,
        staff: [],
        remark: '',
      })
    }
  },

  switchToList(e) {
    this.setData({
      isEdit: false,
    })
  },

  getToday(){
    let date = new Date()
    return date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2,'0') + '-' + String(date.getDate()).padStart(2,'0')
  },

  setPlaceInfoState(e){
    const currentItem = e.currentTarget.dataset.current
    const state = e.currentTarget.dataset.state
    let params = Object.assign(
      currentItem,
      {state},
    )
    http.post('/accountingPlace/updatePlaceInformation', params).then(res => {
      if (res.data.success) {
        this.getPlaceInfo()
      }})
  },

  showStaffPenal(){
    this.selectComponent('#xl-staff-penal').getList()
    this.setData({staffVisible:true})
  },

  showSitePenal(){
    this.selectComponent('#xl-site-penal').getList()
    this.setData({siteVisible:true})
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