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
    staffList:[],
    selected:{}
  },

  methods:{
    getList() {
      let params = {
        size: 999,
        page: 1
      }
      http.post('/accountingPlaceMember/getAccountingPlaceMemberList', params).then(res => {
        if (res.data.success) {
          let staffList = res.data.resource.filter(item => item.state === 0)
          this.setData({
            staffList,
          })
        }
      })
    },

    radioChange(e){
      const selected = this.data.selected
      const target = e.currentTarget.dataset.uinfo
      if(selected[target.id]){
        delete selected[target.id]
      }else{
        selected[target.id] = target
      }
      this.setData({selected})
    },

    sumbit(){
      this.triggerEvent('sumbit',this.data.selected)
      this.setData({visible:false})
    }
  },

})