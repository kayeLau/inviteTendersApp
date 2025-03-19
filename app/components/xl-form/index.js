Component({
  options: {
    styleIsolation: 'shared'
  },
  properties: {
    title: {
      type: String,
      value: ''
    },
    column: {
      type: Array,
      value: []
    },
  },

  data: {
    params: {},
    pickerVisible:{}
  },

  methods: {
    getData() {
      return this.data.params
    },

    textData(params) {
      let oldValue = this.data.params
      let newValue = Object.assign(oldValue,params)
      this.setData({params:newValue})
    },

    bindChange(e) {
      console.log('发送选择改变，携带值为', e);
      let params = this.data.params
      let key = e.currentTarget.dataset.key
      params[key] = e.detail.value
      this.setData({
        params
      });
    },

    showStaffPenal(){
      this.triggerEvent('showStaffPenal')
    },
  },

  onLoad() {
    const pickerVisible = {}
    this.column.forEach(item => {
      if(item.type === 'picker'){
        pickerVisible[item.key] = item.visible
      }
    });
    this.setData({pickerVisible})
    console.log(pickerVisible)
  },

});