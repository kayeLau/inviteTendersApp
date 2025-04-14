// pages/records/index.js
const app = getApp()
import { http } from '../../server/api';
import { recordType } from '../../utils/dict';

Page({
  data: {
    currentDate: new Date().toLocaleDateString(),
    currentYear: new Date().getFullYear(),
    currentMonth: new Date().getMonth(),
    value: new Date().getTime(),
    minDate: new Date(2020, 1, 1).getTime(),
    maxDate: new Date().getTime(),
    workingRecordMap: {},
    singleFormat(day) {
      return day;
    },
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
          let date = new Date(parseInt(item.attendanceDate)).toLocaleDateString();
          if (workingRecordMap[date]) {
            workingRecordMap[date].push({
              ...item,
              explain: this.generateExplainText(item)
            })
          } else {
            workingRecordMap[date] = [{
              ...item,
              explain: this.generateExplainText(item)
            }]
          }
        })

        const singleFormat = (day) => {
          const date = day.date.toLocaleDateString()
          if (workingRecordMap[date]) {
            day.suffix = workingRecordMap[date].reduce((acc, cur) => {
              let amount = cur.cost + (cur.workingHours * cur.salary)
              return acc + amount
            }, 0) + '¥'
          }
          return day
        }
        this.setData({ workingRecordMap, singleFormat })
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
    const currentDate = new Date(e.detail.value).toLocaleDateString()
    this.setData({ currentDate })
  },

  handlePanelChange(e) {
    // this.getWorkingRecord()
  },

  onShow: function () {
    this.getWorkingRecord()
  }

})