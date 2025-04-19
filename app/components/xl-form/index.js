import { uploadImg } from '../../server/api'
import { formatTime } from '../../utils/util';

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
    pickerVisible: {},
    maxDate:new Date().getTime(),
    minDate:new Date(2022, 1, 1).getTime(),
    defaultValue:new Date().getTime(),
    visibleComponentMap: {
      'datepicker': true,
      'picker': true,
    },
    gridConfig: {
      column: 4,
      width: 160,
      height: 160,
    },
    uploadConfig: {
      count: 5,
      sizeType: 'compressed',
      sourceType: ['album', 'camera'],
    }
  },

  methods: {
    getData() {
      return this.data.params
    },

    textData(params) {
      let oldValue = this.data.params
      let newValue = Object.assign(oldValue, params)
      this.setData({
        params: newValue
      })
    },

    async bindChange(e) {
      console.log('发送选择改变，携带值为', e);
      const params = this.data.params
      const pickerVisible = this.data.pickerVisible
      const key = e.currentTarget.dataset.key
      const param = await this.paramsFormatter(e)
      params[key] = param.value;
      console.log(params)
      if (pickerVisible[key]) {
        pickerVisible[key] = {
          label: param.label,
          visible: false
        }
      }
      this.setData({
        params,
        pickerVisible
      });
    },

    async paramsFormatter(e) {
      const key = e.currentTarget.dataset.key
      const target = this.properties.column.find(item => item.key === key)
      if (target.prop === 'datepicker') {
        return {
          value: e.detail.value,
          label: formatTime(new Date(e.detail.value))
        }
      } else if (target.prop === 'picker') {
        return {
          value: e.detail.value.join(','),
          label: e.detail.label.join(' ')
        }
      } else if (target.prop === 'upload') {
        const res = await uploadImg(e.detail.files)
        return {
          value: {
            preview: e.detail.files,
            path: res.map(item => item.data.path).join(',')
          }
        }
      } else {
        return { value: e.detail.value }
      }
    },

    showPicker(e) {
      let key = e.currentTarget.dataset.key
      const pickerVisible = this.data.pickerVisible
      pickerVisible[key].visible = !pickerVisible[key].visible
      this.setData({
        pickerVisible
      })
    },

  },

  lifetimes: {
    attached: function () {
      const pickerVisible = {}
      const params = {}
      this.properties.column.forEach(item => {
        let label = '请选择'
        if(item.prop === 'datepicker'){
          const date = new Date()
          params[item.key] = date.getTime()
          label = formatTime(date)
        }
        if (this.data.visibleComponentMap[item.prop]) {
          pickerVisible[item.key] = {
            visible: item.visible,
            label
          }
        }
      });
      this.setData({
        pickerVisible,
        params
      })
    },
  }
});