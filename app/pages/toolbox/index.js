Page({
  data:{
    role:[
      {
        name:'设置工地',
        icon:'../../assert/hook.png',
        id:'site-boss',
        component:'xl-form'
      },
      {
        name:'记录考勤',
        icon:'../../assert/hook.png',
        id:'construction-site-boss',
        component:'xl-tab'
      },
      {
        name:'记录',
        icon:'../../assert/hook.png',
        id:'records-boss',
        component:'xl-form'
      }
    ]
  },
  jumpTo(event){
    const id = event.currentTarget.dataset.id
    const component = event.currentTarget.dataset.component
    wx.navigateTo({url: `/pages/tool/index?path=${id}&component=${component}`})
  }
});