// pages/records/index.js
const app = getApp()
import { http } from '../../server/api';
import { recordType } from '../../utils/dict';
<<<<<<< Updated upstream
import { formatTime } from '../../utils/util';
=======
import { generateExplainText } from '../../utils/util';
>>>>>>> Stashed changes

Page({
  data: {
    currentDate: formatTime(new Date()),
    currentYear: new Date().getFullYear(),
    currentMonth: new Date().getMonth(),
    value: new Date().getTime(),
    minDate: new Date(2020, 1, 1).getTime(),
    maxDate: new Date().getTime(),
    workingRecordMap: {},
    recordType: recordType
  },

  getWorkingRecord() {
    const data = {
      size: 999,
      page: 1
    }
    http.post('/attendance/getAttendance', data).then(res => {
      if (res.data.success) {
        const workingRecordMap = {}
        res.data.data.forEach(item => {
          let date = formatTime(new Date(parseInt(item.attendanceDate)));
          if (workingRecordMap[date]) {
            workingRecordMap[date].push({
              ...item,
            })
          } else {
            workingRecordMap[date] = [{
              ...item,
            }]
          }
        })

        const singleFormat = (day) => {
          const date = formatTime(day.date)
          if (workingRecordMap[date]) {
            day.suffix = workingRecordMap[date].reduce((acc, cur) => {
              let amount = cur.cost + (cur.workingHours * cur.salary)
              return acc + amount
            }, 0) + '¥'
          }
          return day
        }
      }
    })
  },

  generateExplainText(item) {
    if (item.type === 0) {
      return `上班${item.workingHours}天`
    } else if (item.type === 1) {
      return `上班${item.workingHours}个小时`
    } else if (item.type === 2) {
      return item.costName
    } else {
      return ''
    }
  },

  addRecords() {
    wx.navigateTo({
      url: '/pages/toolAttendance/index',
    })
  },

  addSettlement() {
    wx.navigateTo({
      url: '/pages/settlement/index',
    })
  },

  toDetail(e) {
    app.globalData.workRecordDetail = e.currentTarget.dataset.detail;
    wx.navigateTo({ url: '/pages/clDetail/index' })
  },

  handleSelect(e) {
    const currentDate = formatTime(new Date(e.detail.value))
    this.setData({ currentDate })
  },

  handlePanelChange(e) {
    // this.getWorkingRecord()
  },

  onShow: function () {
    this.getWorkingRecord()
  }

})