// pages/records/index.js
const app = getApp()
import { http } from '../../server/api';
import { recordType } from '../../utils/dict';
import { formatTime } from '../../utils/util';
import { generateExplainText } from '../../utils/util';


Page({
  data: {
    currentDate: formatTime(new Date()),
    currentYear: new Date().getFullYear(),
    currentMonth: new Date().getMonth(),
    value: new Date().getTime(),
    minDate: new Date(2023, 1, 1).getTime(),
    maxDate: new Date().getTime(),
    workingRecordMap: {},
    singleFormat: (day) => day,
    recordType: recordType
  },

  getWorkingRecord() {
    const { currentYear, currentMonth} = this.data
    const firstDay = new Date(currentYear, currentMonth, 1).getTime();
    const lastDay = new Date(currentYear, currentMonth + 1, 0).getTime();
    const data = {
      size: 999,
      page: 1,
      attendanceDate: [firstDay, lastDay]
    }
    http.post('/attendance/getAttendance', data).then(res => {
      if (res.data.success) {
        const workingRecordMap = {}
        res.data.data.forEach(item => {
          let date = formatTime(new Date(parseInt(item.attendanceDate)));
          if (workingRecordMap[date]) {
            workingRecordMap[date].push({
              ...item,
              explain: generateExplainText(item)
            })
          } else {
            workingRecordMap[date] = [{
              ...item,
              explain: generateExplainText(item)
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
        const value = new Date().getTime()
        this.setData({ workingRecordMap, singleFormat, value })
        this.renew()
      }
    })
  },

  renew() {
    const calendar = this.selectComponent("#calendar")
    const date = calendar.getCurrentDate()
    calendar.calcCurrentMonth(date)
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
    const { year, month } = e.detail
    this.setData({ currentMonth: month - 1, currentYear: year })
    this.getWorkingRecord()
  },

  onShow: function () {
    this.getWorkingRecord()
  }

})