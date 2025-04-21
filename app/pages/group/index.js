import { http } from '../../server/api'
import { group } from '../../utils/config'

Page({
  data: {
    formMode:'',
    groupList: [], // 人员列表
    isEdit: false,
    selected:[],
    group:group
  },

  getGroups() {
    let params = {
      size: 999,
      page: 1
    }
    http.post('/acGroup/getGroups', params).then(res => {
      if (res.data.success) {
        let groupList = res.data.data.map(item => {
          item.members = item.members ? item.members.split(',') : []
          item.membersCount = item.members.length
          return item
        })
        this.setData({
          groupList
        })
      }
    })
  },

  sumbitGroup(){
    if(this.data.formMode === 'create'){
      this.createGroup()
    }else if(this.data.formMode === 'edit'){
      this.updateGroup()
    }
  },

  createGroup() {
    let data = this.selectComponent("#xl-form").getData()
    if(!data)return;
    let params = {
      name:data.name,
      members:this.data.selected.map(item => item.value).join(',')
    }
    http.post('/acGroup/createGroup', params).then(res => {
      if (res.data.success) {
        this.getGroups()
        this.setData({
          isEdit: false
        })
      }
    })
  },

  updateGroup(){
    let data = this.selectComponent("#xl-form").getData()
    if(!data)return;
    let params = {
      id:data.id,
      name:data.name,
      members:this.data.selected.map(item => item.value).join(',')
    }
    http.post('/acGroup/updateGroup', params).then(res => {
      if (res.data.success) {
        this.getGroups()
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
      const selected = currentItem.members
      this.setData({ selected })
      this.selectComponent("#xl-form").textData(currentItem)
    }
  },

  switchToList() {
    this.setData({
      isEdit: false,
    })
  },

  jumpto() {
    wx.navigateTo({
      url: `/pages/staffPenal/index?path=group`
    })
  },

  onLoad() {
    this.getGroups()
  }
});