Page({
  data: {
    currentPlace: '',
    currentRole: 1,
    currentRoleImage:'../../assert/construction-worker.png',
    roleMap: {
      1:'工人',
      2:'工头',
      3:'老板'
    },
    visible: false,
    roleVisible: false,
    siteList: [],
    triggered: false,
    tools: [{
      name: '设置工地',
      icon: '../../assert/hook.png',
      path: 'toolSite'
    },
    {
      name: '人员管理',
      icon: '../../assert/workers.png',
      path: 'toolStaff'
    },
    {
      name: '记工',
      icon: '../../assert/note.png',
      path: 'toolAttendance'
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