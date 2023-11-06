// index.js
import { http } from '../../server/api'
const app = getApp()

Page({
  data: {
    list:[],
    pagesize:10,
    params:{
      page:1,
      size:10
    },
    panelHidden:true,
    search:"",
    searchColumn:[
    {
      name:'招标类型',
      list:['全部','招标','变更','中标','废标','比选','资审','其他']
    },
    {
      name:'采购方式',
      list:['全部','公开招标','邀请招标']
    }
  ],
  },

  onLoad() {
    this.getbudInfo()
  },

  getbudInfo(type) {
    let params = this.data.params
    http.post('/buds/getBudList',params).then(res => {
      if(res.data.success){
        if(type !== 'refresh'){
          params.size += this.data.pagesize
          this.setData({params:params})
        }
        this.setData({list:res.data.resource})
      }else{
        this.setData({list:[]})
      }
    }).catch(err => {
      this.setData({list:[]})
    })
  },
  jumpTo(event){
    app.globalData.currentBudDetail = event.currentTarget.dataset.bud
    wx.navigateTo({url: '/pages/detail/index'})
  },
  switchPanel(event){
    let panelHidden = !this.data.panelHidden
    this.setData({panelHidden})
  }
})
