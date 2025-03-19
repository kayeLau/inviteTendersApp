import { http } from '../../server/api'

Page({
  data: {
    siteVisible:false,
    id: '',
    path: '',
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

  switchToList(e) {
    this.setData({
      isEdit: false,
    })
  },
  
  showBottomBtn(){
    this.selectComponent("#xl-bottom-btn").showFrame()
  },

  onLoad: function (option) {
    this.setData({
      'id': option.id,
      'path': option.path,
    })
    this.getPlaceInfo()
  }
});