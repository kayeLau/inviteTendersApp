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
      id: 'site-boss',
      path: 'toolSite'
    },
    {
      name: '人员管理',
      icon: '../../assert/workers.png',
      id: 'staff-manager-boss',
      path: 'toolStaff'
    },
    {
      name: '记工',
      icon: '../../assert/note.png',
      id: 'records-boss',
      path: 'toolAttendance'
    },
    {
      name: '考勤记录',
      icon: '../../assert/under-construction.png',
      id: 'records-boss',
      path: 'toolRecord'
    }
    ]
  },
  jumpTo(event) {
    const id = event.currentTarget.dataset.id
    const path = event.currentTarget.dataset.path
    wx.navigateTo({
      url: `/pages/${path}/index?id=${id}&path=${path}`
    })
  },

});