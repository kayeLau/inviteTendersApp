Component({
  options: {
    styleIsolation: 'shared'
  },
  properties: {
    buttomBtn:{
      type: Boolean,
      value: true
    },
    visible: {
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
      this.setData({visible:false})
    },

    refresh(){
      this.triggerEvent('refresh')
    }

  }

})