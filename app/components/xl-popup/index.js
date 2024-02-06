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
      this.triggerAnimate()
    },

    refresh(){
      this.triggerEvent('refresh')
    },

    triggerAnimate(){
      this.animate('.xl-popup-container', [
        { opacity: 1.0, rotate: 0, backgroundColor: '#FF0000' },
        { opacity: 0.5, rotate: 45, backgroundColor: '#00FF00'},
        { opacity: 0.0, rotate: 90, backgroundColor: '#FF0000' },
        ], 5000)
    }
  },

  

})