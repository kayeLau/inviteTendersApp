// pages/records/index.js
import { http } from '../../server/api';

Page({
  data: {
    currentYear:new Date().getFullYear(),
    currentMonth:new Date().getMonth(),
    value:new Date().getTime(),
    minDate: new Date(2020, 1, 1).getTime(),
    maxDate: new Date().getTime(),
    workingRecord:[],
    singleFormat(day) {
      day.suffix = '¥60';
      return day;
    },
  },

  getWorkingRecord(){
    http.post('/attendance/getAddendce', {}).then(res => {
      if (res.data.success) {
        this.setData({
          isEdit: false
        })
      }
    })
  },

  handleSelect(e){
    console.log(e)
  },

  handlePanelChange(e){
    this.getWorkingRecord()
  },

  onShow : function () {
    this.getWorkingRecord()
  }

})