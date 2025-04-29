import { http } from '../../server/api'


Page({
  data: {
    tab: 0,
    tabLabel: '工友',
    list: [],
    curIndex: '',
    selected: [],
    // config
  },

  async getList() {
    let params = {
      size: 999,
      page: 1,
      state: 0
    }
    await http.post('/material/getMaterials', params).then(res => {
      if (res.data.success) {
        let list = res.data.data.map(item => {
          return {
            label: item.name,
            value: item.id,
            content: item.standard,
          }
        })
        this.setData({
          list
        })
      }
    })
  },

  jumpto() {
    const path = this.data.tab === '1' ? 'group' : 'toolStaff';
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
    let res = this.data.list.find(item =>
        selected === item.value
      )
    return res
  },

  sumbit() {
    const selected = this.getSelected()
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    prevPage.setData({ selected });
    wx.navigateBack();
  },

  async onShow() {
    await this.getList()
  },
})