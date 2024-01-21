export const config = {
  'site-boss': [{
      type: 'input',
      label: '工地名称',
      value: '',
    },
    {
      type: 'input',
      label: '考勤时长',
      value: 0,
    },
    {
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
  'stuff-manager-boss': [{
      title: '在埸',
      desc: '本视频系列课程，由腾讯课堂NEXT学院与微信团队联合出品，通过实战案例，深入浅出地进行讲解。',
    },
    {
      title: '离开',
      desc: '微信小程序直播系列课程持续更新中，帮助大家更好地理解、应用微信小程序直播功能。',
    },
  ]
}