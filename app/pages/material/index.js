import { http } from '../../server/api'
import { material } from '../../utils/config'

Page({
  data: {
    formMode:'',
    list: [],
    isEdit: false,
    material:material
  },

  getGroups() {
    let params = {
      size: 999,
      page: 1
    }
    http.post('/material/getMaterials', params).then(res => {
      if (res.data.success) {
        let list = res.data.data
        this.setData({
          list
        })
      }
    })
  },

  sumbitGroup(){
    if(this.data.formMode === 'create'){
      this.createMaterial()
    }else if(this.data.formMode === 'edit'){
      this.updateMaterial()
    }
  },

  createMaterial() {
    let data = this.selectComponent("#xl-form").getData()
    if(!data)return;
    let params = {
      name:data.name,
      standard:data.standard,
      unit:data.unit,
      rentUnit:data.rentUnit
    }
    http.post('/material/createMaterial', params).then(res => {
      if (res.data.success) {
        this.getGroups()
        this.setData({
          isEdit: false
        })
      }
    })
  },

  updateMaterial(){
    let data = this.selectComponent("#xl-form").getData()
    if(!data)return;
    let params = {
      id:data.id,
      name:data.name,
      standard:data.standard,
      unit:data.unit,
      rentUnit:data.rentUnit
    }
    http.post('/material/updateMaterial', params).then(res => {
      if (res.data.success) {
        this.getGroups()
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

  onLoad() {
    this.getGroups()
  }
});