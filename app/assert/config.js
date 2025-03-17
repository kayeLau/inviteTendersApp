export const config = {
  'site-boss': [{
      key:'name',
      type: 'input',
      label: '工地名称',
      value: '',
    },
    {
      key:'attendanceTime',
      type: 'input',
      label: '考勤时长',
      value: 0,
    },
    {
      key:'attendanceUnit',
      type: 'picker',
      label: '考勤单位',
      value: 0,
      options: [{
          id: 0,
          name: '分钟',
        },
        {
          id: 1,
          name: '小时',
        }
      ]
    }
  ],
  'staff-manager-boss': [{
    key:'user_name',
    type: 'input',
    label: '人员名称',
    value: '',
  },
  {
    key:'phone_number',
    type: 'input',
    label: '手机号码',
    value: '',
  },
  {
    key:'job_type',
    type: 'input',
    label: '岗位工种',
    value: '',
  },
  {
    key:'salary',
    type: 'input',
    label: '当前日薪',
    value: '',
  },
  {
    key:'gender',
    type: 'radio',
    label: '性别',
    value: 0,
    options: [{
        id: 0,
        name: '男',
      },
      {
        id: 1,
        name: '女',
      }
    ]
  },
  {
    key:'id_card_number',
    type: 'input',
    label: '身份证号',
    value: '',
  },
  {
    key:'bank_number',
    type: 'input',
    label: '银行卡号',
    value: 0,
  },
  {
    key:'bank',
    type: 'input',
    label: '发卡银行',
    value: 0,
  }
  ],
  'records-boss':[{
    key:'attendance_date',
    type: 'datepicker',
    label: '记录日期',
    value: '',
  },
  {
    key:'staff',
    type: 'staffPicker',
    label: '出席人员',
    value: '',
  },
  {
    key:'remark',
    type: 'input',
    label: '细节备注',
    value: '',
  },
]
}