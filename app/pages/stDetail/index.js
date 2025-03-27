const app = getApp()

Page({
  data: {
    stDetail: {}
  },

  getDetail() {
    let stDetail = app.globalData.workRecordDetail
    stDetail.dateString = new Date(parseInt(stDetail.attendanceDate)).toLocaleDateString()
    this.setData({
      stDetail
    })
    console.log(this.data.stDetail)
  },

  onLoad() {
    this.getDetail()
  },

})