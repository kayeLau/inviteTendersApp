import { staff } from '../../utils/config.js';
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
    config: staff,
  },

  getPlaceMemberInfo() {
    let params = {
      size: 999,
      page: 1
    }
    http.post('/accountingPlaceMember/getMembers', params).then(res => {
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
      this.createMemberInfo()
    }else if(this.data.formMode === 'edit'){
      this.updatePlaceMemberInfo()
    }
  },

  createMemberInfo() {
    let data = this.selectComponent("#xl-form").getData()
    if(!data)return;
    let params = {
      name:data.name,
      phoneNumber: data.phoneNumber,
      salary: data.salary,
      gender: data.gender,
      jobType:data.jobType,
      idCardNumber:data.idCardNumber,
      bank:data.bank,
      bankNumber:data.bankNumber,
      remark:data.remark,
    }
    http.post('/accountingPlaceMember/createMember', params).then(res => {
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
    if(!data)return;
    let params = {
      id:data.id,
      name:data.name,
      phoneNumber: data.phoneNumber,
      salary: data.salary,
      gender: data.gender,
      jobType:data.jobType,
      idCardNumber:data.idCardNumber,
      bank:data.bank,
      bankNumber:data.bankNumber,
      remark:data.remark,
    }
    http.post('/accountingPlaceMember/updateMember', params).then(res => {
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
      'path': option.path,
    })
    this.getPlaceMemberInfo()
  }
});