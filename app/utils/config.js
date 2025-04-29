export const site = [{
  key: 'name',
  prop: 'input',
  label: '工地名称',
  value: '',
},
{
  key: 'attendanceTime',
  prop: 'input',
  type: 'number',
  label: '考勤时长',
  value: 0,
},
{
  key: 'attendanceUnit',
  prop: 'picker',
  label: '考勤单位',
  visible: false,
  value: '',
  options: [{
    label: '分钟',
    value: 0
  },
  {
    label: '小时',
    value: 1
  },
  ]
}
]
export const staff = [{
  key: 'name',
  prop: 'input',
  label: '人员名称',
  value: '',
},
{
  key: 'phoneNumber',
  prop: 'input',
  label: '手机号码',
  value: '',
  nullable:true
},
{
  key: 'jobType',
  prop: 'input',
  label: '岗位工种',
  value: '',
  nullable:true
},
{
  key: 'salary',
  prop: 'input',
  label: '当前日薪',
  value: '',
},
{
  key: 'gender',
  prop: 'radio',
  label: '性别',
  value: 0,
  options: [{
    value: 0,
    label: '男',
  },
  {
    value: 1,
    label: '女',
  }
  ]
},
{
  key: 'idCardNumber',
  prop: 'input',
  label: '身份证号',
  value: '',
  nullable:true
},
{
  key: 'bankNumber',
  prop: 'input',
  label: '银行卡号',
  value: '',
  nullable:true
},
{
  key: 'bank',
  prop: 'input',
  label: '发卡银行',
  value: '',
  nullable:true
}
]
export const atTimePlace = [{
  key: 'attendanceDate',
  prop: 'datepicker',
  label: '记录日期',
  value: '',
  visible: false
},
{
  key: 'placeId',
  prop: 'picker',
  label: '项目',
  visible: false,
  value: '',
  options: []
},
]
export const atWorkRecord = [{
  key: 'workingHours',
  prop: 'picker',
  label: '工时',
  value: '',
  options: [
    {
      label: '半天',
      value: 0.5
    },
    {
      label: '一天',
      value: 1
    }
  ]
},
{
  key: 'salary',
  prop: 'input',
  type:"number",
  label: '工资',
  value: '',
  suffix: '天'
}
]
export const atWorkRecordHour = [{
  key: 'workingHours',
  prop: 'input',
  type:"number",
  label: '工时',
  value: '',
  rule:[
    { min:24 , msg:'不能大于24' },
    { max:24 , msg:'不能大于24' }
  ]
},
{
  key: 'salary',
  prop: 'input',
  label: '工资',
  type:"number",
  value: '',
}
]
export const ataccount = [{
  key: 'costType',
  prop: 'picker',
  label: '记帐类型',
  value: '',
  options: [
    {
      label: '工地拨款',
      value: 0
    },
    {
      label: '费用支出',
      value: 1
    },
    {
      label: '个人支出',
      value: 2
    }
  ]
},{
  key: 'costName',
  prop: 'input',
  label: '费用名称',
  value: '',
}, {
  key: 'cost',
  prop: 'input',
  label: '金额',
  type:"number",
  value: '',
}
]
export const remarkAndImg = [
  {
    key: 'remark',
    prop: 'input',
    label: '备注',
    value: '',
    nullable:true
  }, {
    key: 'recordImg',
    prop: 'upload',
    label: '上传图片',
    value: [],
    nullable:true
  }
]
export const group = [
  {
    key: 'name',
    prop: 'input',
    label: '班组名称',
    value: '',
  }
]
export const material = [
  {
    key: 'name',
    prop: 'input',
    label: '材料名称',
    value: '',
  },
  {
    key: 'standard',
    prop: 'input',
    label: '规格',
    value: '',
  },
  {
    key: 'unit',
    prop: 'input',
    label: '採购单位',
    value: '',
  },
  {
    key: 'rentUnit',
    prop: 'input',
    label: '租赁单位',
    value: '',
  },
]
export const procurement = [
  {
    key: 'name',
    prop: 'input',
    label: '採购名称',
    value: '',
  },
  {
    key: 'material',
    prop: 'material',
    label: '材料',
    value: '',
  },
  {
    key: 'type',
    prop: 'picker',
    label: '採购类型',
    value: 0,
    options: [
      {
        label: '采购',
        value: 0
      },
      {
        label: '租赁',
        value: 1
      }
    ]
  },
  {
    key: 'unit',
    prop: 'input',
    type:'number',
    label: '单位',
    value: '',
  },
  {
    key: 'price',
    prop: 'input',
    type:'number',
    label: '单价',
    value: '',
  },
  {
    key: 'quantity',
    prop: 'input',
    type:'number',
    label: '採购数量',
    value: '',
  },
  {
    key: 'remark',
    prop: 'input',
    label: '备注',
    value: '',
    nullable:true
  }, 
  {
    key: 'recordImg',
    prop: 'upload',
    label: '上传图片',
    value: [],
    nullable:true
  }
]