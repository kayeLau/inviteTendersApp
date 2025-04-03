import { http } from '../../server/api';
import { atTimePlace, atWorkRecord, ataccount } from '../../utils/config.js';

Page({
  data: {
    tab: 0,
    atTimePlace: atTimePlace,
    atWorkRecord: atWorkRecord,
    ataccount: ataccount,
    mode: 'worker',
    selected: []
  },

  sumbitPlaceInfo() {
    this.createPlaceInfo()
  },

  createPlaceInfo() {
    const params = this.getSumbitParams()
    http.post('/attendance/createAddendce', params).then(res => {
      if (res.data.success) {
        wx.navigateBack({
          delta: 1
        })
      }
    })
  },

  getSumbitParams() {
    let data1 = this.selectComponent("#xl-form-1").getData()
    let data2 = this.selectComponent("#xl-form-2").getData()
    let data3 = this.selectComponent("#xl-form-3").getData()
    const type = this.data.tab
    let params
    if (type === 0) {
      params = {
        remark: data2.remark,
        recordImg: data2.recordImg.path,
        workingHours: data2.workingHours,
        salary: data2.salary,
      }
    } else {
      params = {
        remark: data2.remark,
        recordImg: data3.recordImg.path,
        costName: data3.costName,
        cost: data3.cost,
      }
    }
    return {
      attendanceDate: data1.attendanceDate,
      placeId: data1.placeId,
      mode: this.data.mode,
      type,
      ...params
    }
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
        const _atTimePlace = this.data.atTimePlace
        _atTimePlace[1].options = siteList.map(item => {
          return {
            value: item.id,
            label: item.name
          }
        })
        this.setData({
          atTimePlace: _atTimePlace
        })
      }
    })
  },

  onTabsChange(e) {
    this.setData({
      tab: e.detail.value
    })
  },

  jumpto() {
    wx.navigateTo({
      url: '/pages/staffPenal/index'
    })
  },

  onLoad() {
    this.getPlaces()
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on('staffSelected', (data) => {
      console.log(data)
      this.setData({ selected: data.selected })
    });
  }
});