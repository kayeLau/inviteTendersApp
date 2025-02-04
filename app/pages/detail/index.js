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
    currentBidDetail.bid_body = currentBidDetail.bid_body.replace('windowtext','#000')
    currentBidDetail.bid_body = currentBidDetail.bid_body.split('|')
    .filter(item => item !== '')
    this.setData({bidDetail:currentBidDetail})
  },
})
