Page({
  data:{
    role:[
      {
        name:'设置工地',
        icon:'../../assert/hook.png',
        id:'site-boss',
        path:'toolSite'
      },
      {
        name:'人员管理',
        icon:'../../assert/workers.png',
        id:'stuff-manager-boss',
        path:'toolTab'
      },
      {
        name:'考勤记录',
        icon:'../../assert/under-construction.png',
        id:'records-boss',
        path:'toolSite'
      },
      {
        name:'记录',
        icon:'../../assert/hook.png',
        id:'records-boss',
        path:'toolSite'
      }
    ]
  },
  jumpTo(event){
    const id = event.currentTarget.dataset.id
    const path = event.currentTarget.dataset.path
    wx.navigateTo({url: `/pages/${path}/index?id=${id}&path=${path}`})
  }
});