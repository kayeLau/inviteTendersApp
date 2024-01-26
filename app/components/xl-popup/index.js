Component({
  options: {
    styleIsolation: 'shared'
  },
  properties: {
    visiable: {
      type: Boolean,
      value: false
    },
    title: {
      type: String,
      value: ''
    },
  },

  methods:{
    closePopup(e){
      this.setData({visiable:false})
    },

    refresh(){
      this.triggerEvent('refresh')
    }

  }

})