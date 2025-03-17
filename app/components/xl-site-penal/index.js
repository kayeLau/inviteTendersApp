import { http } from '../../server/api'
Component({
  options: {
    styleIsolation: 'shared'
  },
  properties:{
    visible:{
      type:Boolean,
      value: ''
    }
  },

  data:{
    siteList:[],
  },

  methods:{
    async getList() {
      let params = {
        size: 999,
        page: 1
      }
      await http.post('/accountingPlace/getPlaces', params).then(res => {
        if (res.data.success) {
          let siteList = res.data.resource.filter(item => item.state === 0)
          this.setData({
            siteList
          })
        }
      })
    },

  },

})