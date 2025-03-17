// index.js
import { http } from '../../server/api'
const app = getApp()

Page({
  data: {
    list:[],
    pagesize:10,
    params:{
      page:1,
      size:10,
      total:0
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
    this.getbidInfo()
  },
//输入为空时刷新页面
  checkInput(event) {
    if (!event.detail.value) {
      const pages = getCurrentPages();
      const currentPage = pages[pages.length - 1];
      wx.reLaunch({
        url: `/${currentPage.route}`
      });
    }},
    
  getbidInfobyInput(event){
    let bidTitle = event.detail.value
    if(bidTitle){
      this.getbidInfo('refresh',{bidTitle})
    }
  },

  getbidInfo(type,options) {
    let params = Object.assign(this.data.params,options)
    http.post('/bids/getBids',params).then(res => {
      if(res.data.success){
        if(type !== 'refresh'){
          params.size += this.data.pagesize
        }
        params.total = res.data.total
        this.setData({list:res.data.data ,params:params})
      }else{
        this.setData({list:[]})
      }
    }).catch(err => {
      this.setData({list:[]})
    })
  },
  jumpTo(event){
    app.globalData.currentBidDetail = event.currentTarget.dataset.bid
    wx.navigateTo({url: '/pages/detail/index'})
  },
  switchPanel(event){
    let panelHidden = !this.data.panelHidden
    this.setData({panelHidden})
  }
})
