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
    params: {}
  },

  methods: {
    getDefaultValue() {
      let defaultValue = {}
      this.properties.column.forEach(item => {
        defaultValue[item.key] = item.value
      })
      return defaultValue
    },

    getData() {
      let defaultValue = this.getDefaultValue()
      let value = this.data.params
      return Object.assign(
        defaultValue,
        value
      )
    },

    textData(params) {
      this.setData({params})
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
  },

});