import { http } from '../../server/api'
Component({
  properties:{
    showPlace:{
      type:Boolean,
      value:false
    }
  },
  options: {
    styleIsolation: 'shared'
  },
  data: {
    roleVisible: false,
    placeVisible: false,
    currentPlace: '',
    siteList: [],
    currentRole: 1,
    currentRoleImage: '../../assert/worker.png',
    roleMap: {
      1: '工人',
      2: '工头',
      3: '老板'
    },
    role: [
      {
        name: '工人记账',
        id: 1,
        icon: '../../assert/worker.png'
      },
      {
        name: '带班记账',
        id: 2,
        icon: '../../assert/engineer.png'
      },
      {
        name: '老板记账',
        id: 3,
        icon: '../../assert/boss.png'
      }
    ]
  },

  methods: {
    setRole(e) {
      const id = e ? e.currentTarget.dataset.id : null
      const roleId = this.wxStorage(id, 'roleId')
      const currentRoleId = roleId ? roleId : 1
      const currentRoleImage = this.data.role.find(item => item.id === currentRoleId)
      this.setData({
        currentRole: currentRoleId,
        roleVisible: false,
        currentRoleImage: currentRoleImage.icon,
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
      await http.post('/acPlace/getPlaces', params).then(res => {
        if (res.data.success) {
          let siteList = res.data.data.filter(item => item.state === 0)
          this.setData({ siteList })
        }
      })
    },

    setPlace(e) {
      const id = e ? e.currentTarget.dataset.id : null
      const currentPlaceId = this.wxStorage(id, 'placeId')
      const currentPlace = this.data.siteList.find(item => item.id === currentPlaceId)
      this.setData({
        currentPlace: currentPlace ? currentPlace.name : '全部项目',
        placeVisible: false
      })
    },

    showRoleChange() {
      this.setData({ roleVisible: true })
    },

    wxStorage(value, key) {
      if (value) {
        wx.setStorageSync(key, value)
        return value
      } else {
        return wx.getStorageSync(key)
      }
    }
  },

  lifetimes: {
    attached: async function () {
      await this.getPlaceInfo()
      this.setPlace()
    },
  },
  pageLifetimes:{
    show:function(){
      this.setRole()
    }
  }

});