import { http } from '../../server/api'
import { procurementPay } from '../../utils/config'

Page({
  data: {
    procurementId:null,
    list: [],
    isEdit: true,
    procurementPay:procurementPay,
    total:0,
    unPay:0
  },

  sumbitProcurement(){
    this.createProcurement()
  },

  createProcurement() {
    const data = this.selectComponent("#xl-form").getData()
    const type = wx.getStorageSync('roleId')
    if(!data)return;
    let params = {
      payDate:data.payDate,
      paid:data.paid,
      remark:data.remark,
      type,
      recordImg:data.recordImg.length ? data.recordImg.path : '',
    }
    http.post('/procurementPay/createProcurementPay', params).then(res => {
      if (res.data.success) {
      }
    })
  },

  onLoad(options) {
    this.setData({ 
      procurementId:Number(options.id),
      total:Number(options.total),
    })
  }
});