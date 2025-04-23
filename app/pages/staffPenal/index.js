import { http } from '../../server/api'


Page({
  data: {
    tab: 0,
    tabLabel: '工友',
    list: [],
    memberList: [],
    groupList: [],
    curIndex: '',
    stickyOffset: 0,
    selected: [],
  },

  async getMembers() {
    let params = {
      size: 999,
      page: 1,
      state: 0
    }
    await http.post('/acMember/getMembers', params).then(res => {
      if (res.data.success) {
        let memberList = res.data.data.map(item => {
          return {
            label: item.name,
            value: item.id,
            content: item.phoneNumber,
          }
        })
        this.setData({
          memberList
        })
      }
    })
  },

  async getGroups() {
    let params = {
      size: 999,
      page: 1
    }
    await http.post('/acGroup/getGroups', params).then(res => {
      if (res.data.success) {
        let groupList = res.data.data.map(item => {
          const len = Math.ceil(item.members.length / 2)
          return {
            label: item.name,
            value: item.id,
            content: '共' + len + '个成员',
            members: item.members
          }
        })
        this.setData({
          groupList
        })
      }
    })
  },

  jumptoStaff() {
    wx.navigateTo({
      url: '/pages/toolStaff/index',
    })
  },

  handleGroupChange(e) {
    const selected = e.detail.value
    this.setData({ selected })
  },

  getSelected() {
    let res = this.data.list.filter(item =>
      this.data.selected.includes(item.value)
    )
    if (this.data.tab === '1') {
      let members = []
      res.forEach(item => {
        const groupMember = item.members.split(',').map(item => Number(item))
        members = [...members, ...groupMember]
      })
      res = this.data.memberList.filter(item =>
        members.includes(item.value)
      )
    }
    return res
  },

  sumbit() {
    const selected = this.getSelected()
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    prevPage.setData({ selected });
    wx.navigateBack();
  },

  onTabsChange(e) {
    const { value, label } = e.detail
    const list = value === '1' ? this.data.groupList : this.data.memberList
    this.setData({ tab: value, tabLabel: label, list, selected: [] })
  },

  async onShow() {
    await this.getMembers()
    await this.getGroups()
    this.setData({ list: this.data.memberList })
  },
  onLoad(options) {

  }
})