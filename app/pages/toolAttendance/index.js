import { http } from '../../server/api';
import { atTimePlace , atWorkRecord , ataccount } from '../../utils/config.js';

Page({
  data: {
    atTimePlace:atTimePlace,
    atWorkRecord:atWorkRecord,
    ataccount:ataccount,
    mode:'worker'
  },

  sumbitPlaceInfo(){
      this.createPlaceInfo()
  },

  createPlaceInfo() {
    let data1 = this.selectComponent("#xl-form-1").getData()
    let data2 = this.selectComponent("#xl-form-2").getData()
    let data3 = this.selectComponent("#xl-form-3").getData()
    let params = {
      attendanceDate: data1.attendanceDate,
      placeId: data1.placeId,
      workingHours:data2.workingHours,
      remarkWK: data2.remarkWK,
      recordImgWK: data2.recordImgWK,
      costName: data3.costName,
      cost: data3.cost,
      remarkAC: data3.remarkAC,
      recordImgAC: data3.recordImgAC,
      mode:this.data.mode
    }
    http.post('/attendance/createAddendce', params).then(res => {
      if (res.data.success) {
        this.setData({
          isEdit: false
        })
      }
    })
  },

  getPlaces() {
    let params = {
      size: 999,
      page: 1,
      state:0
    }
    http.post('/accountingPlace/getPlaces', params).then(res => {
      if (res.data.success) {
        const siteList = res.data.data
        const _atTimePlace = this.data.atTimePlace
        _atTimePlace[1].options = siteList.map(item => {
            return {
              value:item.id,
              label:item.name
            }
          })
        this.setData({
          atTimePlace:_atTimePlace
        })
      }
    })
  },

  onLoad: function () {
    this.getPlaces()
  }
});