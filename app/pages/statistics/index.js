import { recordType } from '../../utils/dict.js';
import { http } from '../../server/api'

Page({
  data: {
    record:{},
    summary:{},
    totalAmount:0,
    //search
    placeName:'全部项目',
    placeId:[''],
    dateValue: [],
    dateLabel: [],
    dateVisible:false,
    maxDate:new Date().getTime(),
    minDate:new Date(2022, 1, 1).getTime(),
    placeVisible:false,
    places:[],
    // dict
    recordType:recordType
  },

  handleCalendar() {
    this.setData({ dateVisible: true });
  },

  handlePlace() {
    this.setData({ placeVisible: true });
  },

  handleDateConfirm(e) {
    const dateValue = e.detail.value;
    const dateLabel = dateValue.map(item => new Date(item).toLocaleDateString())
    this.setData({
      dateValue,
      dateLabel
    });
    this.getAttendance()
  },

  handlePlaceConfirm(e){
    const placeId = e.detail.value;
    const placeName = e.detail.label
    this.setData({ placeId, placeName });
    this.getAttendance()
  },

  setDefaultSearchDate(){
    const end = new Date().getTime()
    const start = end - (60 * 60 * 60 * 12 * 1000)
    const dateValue = [start,end]
    const dateLabel = dateValue.map(item => new Date(item).toLocaleDateString())
    this.setData({ dateValue , dateLabel })
  },

  getAttendance() {
    const attendanceDate = this.data.dateValue
    const placeId = this.data.placeId[0]
    let params = {
      size: 999,
      page: 1,
      attendanceDate,
      placeId
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

  getPlaces() {
    let params = {
      size: 999,
      page: 1,
      state: 0
    }
    http.post('/accountingPlace/getPlaces', params).then(res => {
      if (res.data.success) {
        const siteList = res.data.data
        const places = siteList.map(item => {
          return {
            value: item.id,
            label: item.name
          }
        })
        places.push({value: '', label: '全部项目'})
        this.setData({ places })
      }
    })
  },

  onLoad(){
    this.setDefaultSearchDate()
    this.getAttendance()
    this.getPlaces()
  }
});