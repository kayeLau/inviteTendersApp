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
    // config
    showGroup:false,
    showAdd:true,
    mutiSelect:true,
    callback:''
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

  jumpto() {
    const path = this.data.tab === '1' ? 'group' : 'member';
    wx.navigateTo({
      url: `/pages/${path}/index`,
    })
  },

  handleGroupChange(e) {
    const selected = e.detail.value
    this.setData({ selected })
  },

  getSelected() {
    const selected = this.data.selected
    let res = []
    if(Array.isArray(selected)){
      res = this.data.list.filter(item =>
        selected.includes(item.value)
      )
    }else{
      res = this.data.list.filter(item =>
        selected === item.value
      )
    }

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
    const callback = this.data.callback
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    prevPage.setData({ selected });
    if(prevPage[callback]){
      prevPage[callback](selected)
    }
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
    const tab = this.data.tab
    if(tab === '1'){
      this.setData({ list: this.data.groupList })
    }else{
      this.setData({ list: this.data.memberList })
    }
  },
  onLoad(options) {
    this.setData({
      showGroup:options.showGroup === 'true' ? true : false,
      showAdd:options.showAdd === 'false' ? false : true,
      mutiSelect:options.mutiSelect === 'true' ? true : false,
      callback:options.callback
    })
  }
})