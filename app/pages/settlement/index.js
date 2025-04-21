import { http } from '../../server/api';
import { atTimePlace, atWorkRecordHour, atWorkRecord, ataccount, remarkAndImg} from '../../utils/config.js';

Page({
  data: {
    tab: 0,
    atTimePlace: atTimePlace,
    atWorkRecord: atWorkRecord,
    atWorkRecordHour: atWorkRecordHour,
    ataccount: ataccount,
    remarkAndImg: remarkAndImg,
    mode: 1,
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
    let data4 = this.selectComponent("#xl-form-4").getData()
    let data5 = this.selectComponent("#xl-form-5").getData()
    const staffId = this.data.selected.map(item => item.value).join(',')
    const type = this.data.tab
    let params
    if (type === '0') {
      params = {
        workingHours: data2.workingHours,
        salary: data2.salary,
      }
    } else if (type === '1') {
      params = {
        workingHours: data3.workingHours,
        salary: data3.salary,
      }
    } else if(type === '2') {
      params = {
        costName: data4.costName,
        cost: data4.cost,
      }
    }
    console.log(params)
    return {
      attendanceDate: data1.attendanceDate,
      placeId: data1.placeId,
      mode: this.data.mode,
      remark: data5.remark,
      recordImg: data5.recordImg ? data5.recordImg.path : '',
      type,
      staffId,
      ...params
    }
  },

  getPlaces() {
    let params = {
      size: 999,
      page: 1,
      state: 0
    }
    http.post('/acPlace/getPlaces', params).then(res => {
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

  setUserInfo(){
    const roleId = wx.getStorageSync('roleId')
    this.setData({mode:roleId})
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
      this.setData({ selected: data.selected })
    });
  },
  onShow(){
    this.setUserInfo()
  }
});