import { http } from '../../server/api'


Page({
  data: {
    list: [],
    curIndex: '',
    stickyOffset: 0,
    selected: [],
  },

  getList() {
    let params = {
      size: 999,
      page: 1,
      state: 0
    }
    http.post('/acMember/getMembers', params).then(res => {
      if (res.data.success) {
        let list = res.data.data.map(item => {
          return {
            label: item.name,
            value: item.id,
            content: item.phoneNumber,
            maxContentRow: 2,
          }
        })
        this.setData({
          list
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
    this.setData({
      selected
    })
  },

  sumbit() {
    console.log(this.data.list)
    const select = this.data.list.filter(item =>
      this.data.selected.includes(item.value)
    )
    wx.navigateTo({
      url: '/pages/toolAttendance/index',
      success: function (res) {
        res.eventChannel.emit('staffSelected', {
          selected: select
        });
      }
    })
  },


  onShow() {
    this.getList()
  }

})