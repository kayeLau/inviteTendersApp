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
    params: {}, // 值map
    rule: {}, // 校驗map
    pickerVisible: {}, // picker顯示map
    maxDate: new Date().getTime(),
    minDate: new Date(2022, 1, 1).getTime(),
    defaultValue: new Date().getTime(),
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
      const pass = this.verify()
      if (pass) {
        return this.data.params
      } else {
        return false
      }
    },

    // 回显资料
    textData(params) {
      let oldValue = this.data.params
      let newValue = Object.assign(oldValue, params)
      this.initValue(newValue)
      this.setData({
        params: newValue
      })
    },

    // 计算不能直接回显的资料
    initValue(params) {
      const pickerVisible = {}
      this.properties.column.forEach(item => {
        if (item.prop === 'picker') {
          pickerVisible[item.key] = {
            visible: false,
            label: item.options.find(op => {
              return op.value === Number(params[item.key])
            }).label
          }
        }
        if(item.callback){
          item.callback(params)
        }
      });
      this.setData({
        pickerVisible
      })
    },

   // 值改变时
    async bindChange(e) {
      console.log('发送选择改变，携带值为', e);
      const params = this.data.params
      const pickerVisible = this.data.pickerVisible
      const key = e.currentTarget.dataset.key
      const target = this.properties.column.find(item => item.key === key)
      const param = await this.paramsFormatter(e,target)
      params[key] = param.value;
      if(target.callback){
        target.callback(params)
      }
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

    // 格形化改变值
    async paramsFormatter(e,target) {
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
        return {
          value: e.detail.value
        }
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

    // 表单规则验算
    verify() {
      const params = this.data.params
      const rule = this.data.rule
      let pass = true
      this.properties.column.forEach(item => {
        if (!item.nullable) {
          if (params[item.key] === null || params[item.key] === undefined) {
            console.log(params[item.key])
            const action = item.prop === 'input' ? '输入' : '选择'
            rule[item.key] = '请' + action + item.label
            pass = false
          }
        }
      })
      this.setData({
        rule
      })
      return pass
    }
  },

  lifetimes: {
    attached: function () {
      const pickerVisible = {}
      const params = {}
      this.properties.column.forEach(item => {
        let label = '请选择'
        params[item.key] = item.value
        if (item.prop === 'datepicker') {
          const date = new Date()
          params[item.key] = date.getTime()
          label = formatTime(date)
        }
        if (this.data.visibleComponentMap[item.prop]) {
          pickerVisible[item.key] = {
            visible: false,
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