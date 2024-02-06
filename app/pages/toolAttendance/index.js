import { config } from '../../assert/config.js';
import { http } from '../../server/api'

Page({
  data: {
    formMode:'',
    isEdit: false,
    attendanceList:[],
    //search
    dateVisible:false,
    siteVisible:false,
    staffVisible:false,
    searchDate:'2024-01-27',
    searchSite:'广州',
    searchStaff:'',
    // config
    id: '',
    path: '',
    config: [],
  },

  getAttendance() {
    let params = {
      size: 999,
      page: 1,
      attendance_date:this.data.searchDate,
      place_id:this.data.searchSite,
      staff_id:this.data.searchStaff,
    }
    http.post('/attendance/getAddendce', params).then(res => {
      if (res.data.success) {
        let attendanceList = res.data.resource
        this.setData({attendanceList})
      }
    })
  },

  sumbitAttendance(){
    if(this.data.formMode === 'create'){
      this.createAttendance()
    }else if(this.data.formMode === 'edit'){
      this.updateAttendance()
    }
  },

  createAttendance() {
    let data = this.selectComponent("#xl-form").getData()
    let params = {
      attendance_date: data.attendance_date,
      staff: data.staff,
      remark: data.remark,
    }
    http.post('/attendance/createAddendce', params).then(res => {
      if (res.data.success) {
        this.getAttendance()
        this.setData({
          isEdit: false
        })
      }
    })
  },

  updateAttendance(){
    let data = this.selectComponent("#xl-form").getData()
    let params = {
      id:data.id,
      place_name: data.place_name,
      attendance_time: data.attendance_time,
      attendance_unit: data.attendance_unit,
      state:0,
    }
    http.post('/accountingPlace/updatePlace', params).then(res => {
      if (res.data.success) {
        this.getAttendance()
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
        attendance_date: today,
        staff: {},
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

  setAttendanceState(e){
    const currentItem = e.currentTarget.dataset.current
    const state = e.currentTarget.dataset.state
    let params = Object.assign(
      currentItem,
      {state},
    )
    http.post('/accountingPlace/updatePlace', params).then(res => {
      if (res.data.success) {
        this.getAttendance()
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

  onSumbit(e){
    console.log(e)
    const staff = Object.values(e.detail)
    if(this.data.isEdit){
      this.selectComponent("#xl-form").textData({staff})
    }else{
      const searchStaff = staff.map(item => item.id)
      this.setData({searchStaff})
      this.getAttendance()
    }
  },

  onLoad: function (option) {
    this.setData({
      'id': option.id,
      'path': option.path,
      'config': config[option.id]
    })
    this.getAttendance()
  }
});