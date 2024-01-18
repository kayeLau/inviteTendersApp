Component({
  options:{
    styleIsolation:'shared'
  },
  properties: {
    title:{
      type: String,
      value: ''
    },
    column: {
      type: Array,
      value: []
    }
  },

  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e);
    this.setData({
      arrIndex: e.detail.value,
    });
  },
});