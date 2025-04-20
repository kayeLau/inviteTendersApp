Page({
  data: {
    currentPlace: '',
    currentRole: 1,
    currentRoleImage: '../../assert/construction-worker.png',
    roleMap: {
      1: '工人',
      2: '工头',
      3: '老板'
    },
    visible: false,
    roleVisible: false,
    siteList: [],
    triggered: false,
    pjManage: [{
      name: '设置项目',
      icon: '../../assert/hook.png',
      path: 'toolSite'
    },
    {
      name: '人员管理',
      icon: '../../assert/worker.png',
      path: 'toolStaff'
    },
    {
      name: '班组管理',
      icon: '../../assert/workers.png',
      path: 'group'
    },
    ],
    rdManage: [
      {
        name: '记工记帐',
        icon: '../../assert/note.png',
        path: 'toolAttendance'
      },
      {
        name: '结算',
        icon: '../../assert/pay.png',
        path: 'settlement'
      },
      {
        name: '考勤记录',
        icon: '../../assert/under-construction.png',
        path: 'toolRecord'
      }
    ]
  },
  jumpTo(event) {
    const id = event.currentTarget.dataset.id
    const path = event.currentTarget.dataset.path
    wx.navigateTo({
      url: `/pages/${path}/index?path=${path}`
    })
  },

});