import { recordType } from '../../utils/dict.js';
import { http } from '../../server/api'

Page({
  data: {
    record:{},
    summary:{},
    totalAmount:0,
    //search
    dateValue: [],
    dateLabel: [],
    dateVisible:false,
    searchDate:'2024-01-27',
    // dict
    recordType:recordType
  },

  handleCalendar() {
    this.setData({ dateVisible: true });
  },

  handleConfirm(e) {
    console.log(e)
    const dateValue = e.detail.value;
    const dateLabel = new Date(dateValue).toLocaleDateString()
    this.setData({
      dateValue,
      dateLabel
    });
  },

  setDefaultSearchDate(){
    const end = new Date()
    const start = end.getTime() - (60 * 60 * 60 * 24 * 1000)
    const dateValue = [start,end]
    const dateLabel = dateValue.map(item => new Date(item).toLocaleDateString())
    this.setData({ dateValue , dateLabel })
  },

  getAttendance() {
    let params = {
      size: 999,
      page: 1,
    }
    http.post('/attendance/getAttendance', params).then(res => {
      const record = {}
      const summary = {}
      let totalAmount = 0
      if (res.data.success) {
        res.data.data.forEach(item => {
          let amount = item.cost + (item.workingHours * item.salary)
          totalAmount += amount
          if(record[item.type]){
            record[item.type].push(item)
            summary[item.type].count++
            summary[item.type].total += amount
          }else{
            record[item.type] = [item]
            summary[item.type] = {
              type:item.type,
              count:1,
              total:amount
            }
          }
        });
        this.setData({record, summary, totalAmount})
      }
    })
  },

  onLoad(){
    this.setDefaultSearchDate()
    this.getAttendance()
  }
});