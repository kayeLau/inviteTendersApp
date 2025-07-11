import { downloadImg } from '../../server/api';
import { formatTime } from '../../utils/util';
const app = getApp()
import { http } from '../../server/api';
import { recordType } from '../../utils/dict';
import { generateExplainText } from '../../utils/util';


Page({
  data: {
    record: {},
    totalAmount: 0,
    recordType: recordType
  },

  getDetail(options) {
    const startDate = Number(options.startDate)
    const endDate = Number(options.endDate)
    const placeId = options.placeId[0]
    const type = options.type
    let params = {
      size: 999,
      page: 1,
      attendanceDate: [startDate, endDate],
      placeId,
      type
    }
    http.post('/attendance/getAttendance', params).then(res => {
      const record = {}
      let totalAmount = 0
      if (res.data.success) {
        res.data.data.forEach(item => {
          let amount = item.cost + (item.workingHours * item.salary)
          const date = formatTime(new Date(Number(item.attendanceDate)))
          const timeStamp = item.attendanceDate
          totalAmount += amount
          item.explain = generateExplainText(item)
          if (record[timeStamp]) {
            record[timeStamp].children.push(item)
          } else {
            record[timeStamp] = {
              timeStamp,
              date,
              children: [item]
            }
          }
        });
        this.setData({
          record: this.sortObjectByKey(record, true), totalAmount
        })
      }
    })
  },

  sortObjectByKey(obj, descending = false) {
    return Object.values(obj)
      .sort((a, b) => {
        return descending ? b.timeStamp - a.timeStamp
          : a.timeStamp - b.timeStamp;
      });
  },

  getImg(imgs) {
    if (!imgs.length) return;
    downloadImg(imgs).then(stImgs => {
      this.setData({ stImgs })
    })
  },

  toDetail(e) {
    app.globalData.workRecordDetail = e.currentTarget.dataset.detail;
    wx.navigateTo({ url: '/pages/clDetail/index' })
  },

  onLoad(options) {
    this.getDetail(options)
  },

})