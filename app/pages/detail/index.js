const app = getApp()

Page({
  data: {
    bidDetail:{}
  },

  onLoad() {
    this.detailFormatter()
  },

  detailFormatter(){
    let currentBidDetail = app.globalData.currentBidDetail
    currentBidDetail.bidBody = currentBidDetail.bidBody.replace('windowtext','#000')
    currentBidDetail.bidBody = currentBidDetail.bidBody.split('|')
    .filter(item => item !== '')
    this.setData({bidDetail:currentBidDetail})
  },
})
