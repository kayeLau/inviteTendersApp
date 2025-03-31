import { http } from '../../server/api'
Component({
  options: {
    styleIsolation: 'shared'
  },
  data:{
    roleVisible:false,
    placeVisible:false,
    currentPlace: '77',
    siteList:[],
    currentRole: 1,
    currentRoleImage:'../../assert/worker.png',
    roleMap: {
      1:'工人',
      2:'工头',
      3:'老板'
    },
    role:[
      {
        name:'工人记账',
        id:1,
        icon:'../../assert/worker.png'
      },
      {
        name:'带班记账',
        id:2,
        icon:'../../assert/engineer.png'
      },
      {
        name:'老板记账',
        id:3,
        icon:'../../assert/boss.png'
      }
    ]
  },
  
  methods:{
    changeRole(event){
      this.triggerEvent('changeRole', { 
        id: event.currentTarget.dataset.id,
      });
      this.setData({
        currentRole:event.currentTarget.dataset.id,
        roleVisible:false,
        currentRoleImage:event.currentTarget.dataset.icon,
      })
    },
  
    async openSiteSelector() {
      await this.getPlaceInfo()
      this.setData({ placeVisible: true })
    },
  
    async getPlaceInfo() {
      let params = {
        size: 999,
        page: 1
      }
      await http.post('/accountingPlace/getPlaces', params).then(res => {
        if (res.data.success) {
          let siteList = res.data.data.filter(item => item.state === 0)
          this.setData({siteList})
        }
      })
    },
  
    setCurrentPlace(e) {
      let currentPlaceId
      if(e){
        currentPlaceId = e.currentTarget.dataset.id
        wx.setStorageSync('currentPlaceId', currentPlaceId)
      }else{
        currentPlaceId = wx.getStorageSync('currentPlaceId')
      }
      const currentPlace = this.data.siteList.find(item => item.id === currentPlaceId)
      this.setData({
        currentPlace: currentPlace ? currentPlace.name : '工地',
        placeVisible: false
      })
    },
  
    showRoleChange(){
      this.setData({ roleVisible: true })
    }
  },

  lifetimes: {
    attached: async function () {
      await this.getPlaceInfo()
      this.setCurrentPlace()
    },
  }

});