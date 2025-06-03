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

  getProcurements() {
    let params = {
      size: 999,
      page: 1,
      procurementId:this.data.procurementId
    }
    http.post('/procurementPay/getProcurementPays', params).then(res => {
      if (res.data.success) {
        let list = res.data.data
        this.setData({
          list
        })
      }
    })
  },

  sumbitProcurement(){
    this.createProcurement()
  },

  createProcurement() {
    const data = this.selectComponent("#xl-form").getData()
    const type = wx.getStorage("roleId")
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
        this.getProcurements()
        this.setData({
          isEdit: false
        })
      }
    })
  },

  updateProcurement(){
    let data = this.selectComponent("#xl-form").getData()
    if(!data)return;
    let params = {
      id:data.id,
      name:data.name,
      type: data.type,
      unit:data.unit,
      price:data.price,
      quantity:data.quantity,
      remark:data.remark,
      recordImg:data.recordImg.length ? data.recordImg.path : '',
    }
    http.post('/procurementPay/updateProcurementPay', params).then(res => {
      if (res.data.success) {
        this.getProcurements()
        this.setData({
          isEdit: false
        })
      }})
  },

  async switchToEdit(e) {
    const formMode = e.currentTarget.dataset.mode
    this.setData({
      isEdit: true,
      formMode
    })
    const currentItem = e.currentTarget.dataset.current
    if(currentItem){
      this.selectComponent("#xl-form").textData(currentItem)
    }
  },

  switchToList() {
    this.setData({
      isEdit: false,
    })
  },

  onLoad(options) {
    this.setData({ 
      procurementId:Number(options.id),
      total:Number(options.total),
    })
    this.getProcurements()
  }
});