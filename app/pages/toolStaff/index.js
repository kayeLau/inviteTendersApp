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
    staffList: [], // 人员列表
    endstaffList: [], // 离开的人员列表
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

  getPlaceMemberInfo() {
    let params = {
      size: 999,
      page: 1
    }
    http.post('/accountingPlaceMember/getAccountingPlaceMemberList', params).then(res => {
      if (res.data.success) {
        let staffList = res.data.data.filter(item => item.state === 0)
        let endstaffList = res.data.data.filter(item => item.state === 1)
        this.setData({
          staffList,
          endstaffList
        })
      }
    })
  },

  sumbitPlaceMemberInfo(){

    if(this.data.formMode === 'create'){
      this.createPlaceMemberInfo()
    }else if(this.data.formMode === 'edit'){
      this.updatePlaceMemberInfo()
    }
  },

  createPlaceMemberInfo() {
    let data = this.selectComponent("#xl-form").getData()
    const userInfo = wx.getStorageSync('userInfo')
    let params = {
      create_user_id: userInfo.id,
      place_id:userInfo.current_place_id,
      user_name:data.user_name,
      user_id:data.user_id,
      phone_number: data.phone_number,
      salary: data.salary,
      gender: data.gender,
      job_type:data.job_type,
      id_card_number:data.id_card_number,
      bank:data.bank,
      bank_number:data.bank_number,
      remark:data.remark,
    }
    http.post('/accountingPlaceMember/createPlaceMember', params).then(res => {
      if (res.data.success) {
        this.getPlaceMemberInfo()
        this.setData({
          isEdit: false
        })
      }
    })
  },

  updatePlaceMemberInfo(){
    let data = this.selectComponent("#xl-form").getData()
    const userInfo = wx.getStorageSync('userInfo')
    let params = {
      id:data.id,
      create_user_id: userInfo.id,
      place_id:userInfo.current_place_id,
      user_name:data.user_name,
      user_id:data.user_id,
      phone_number: data.phone_number,
      salary: data.salary,
      gender: data.gender,
      job_type:data.job_type,
      id_card_number:data.id_card_number,
      bank:data.bank,
      bank_number:data.bank_number,
      remark:data.remark,
      state:0
    }
    http.post('/accountingPlaceMember/updatePlaceMember', params).then(res => {
      if (res.data.success) {
        this.getPlaceMemberInfo()
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

  setPlaceMemberInfoState(e){
    const currentItem = e.currentTarget.dataset.current
    const state = e.currentTarget.dataset.state
    let params = Object.assign(
      currentItem,
      {state},
    )
    http.post('/accountingPlaceMember/updatePlaceMember', params).then(res => {
      if (res.data.success) {
        this.getPlaceMemberInfo()
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
    this.getPlaceMemberInfo()
  }
});