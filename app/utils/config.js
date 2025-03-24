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
  },
  {
    key: 'jobType',
    prop: 'input',
    label: '岗位工种',
    value: '',
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
  },
  {
    key: 'bankNumber',
    prop: 'input',
    label: '银行卡号',
    value: 0,
  },
  {
    key: 'bank',
    prop: 'input',
    label: '发卡银行',
    value: 0,
  }
]
export const workRecords = [{
    key: 'attendance_date',
    prop: 'datepicker',
    label: '记录日期',
    value: '',
  },
  {
    key: 'staff',
    prop: 'staffPicker',
    label: '出席人员',
    value: '',
  },
  {
    key: 'remark',
    prop: 'input',
    label: '细节备注',
    value: '',
  },
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
  prop: 'input',
  label: '工时',
  value: '',
}, {
  key: 'remarkWK',
  prop: 'input',
  label: '备注',
  value: '',
}, {
  key: 'recordImgWK',
  prop: 'upload',
  label: '上传图片',
  value: [],
}]

export const ataccount = [{
  key: 'costName',
  prop: 'input',
  label: '费用名称',
  value: '',
}, {
  key: 'cost',
  prop: 'input',
  label: '金额',
  value: '',
},{
  key: 'remarkAC',
  prop: 'input',
  label: '备注',
  value: '',
}, {
  key: 'recordImgAC',
  prop: 'upload',
  label: '上传图片',
  value: [],
}]