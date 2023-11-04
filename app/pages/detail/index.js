const app = getApp()

Page({
  data: {
    budDetail:{}
  },

  onLoad() {
    this.detailFormatter()
  },

  detailFormatter(){
    let currentBudDetail = app.globalData.currentBudDetail
    currentBudDetail.bud_body = currentBudDetail.bud_body.split('|')
    .filter(item => item !== '')
    this.setData({budDetail:currentBudDetail})
  }

})
