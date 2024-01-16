Page({
  data:{
    role:[
      {name:'设置工地'},
      {name:'记录考勤'},
      {name:'记录'}
    ]
  },
  jumpTo(event){
    wx.navigateTo({url: '/pages/tool/index'})
  }
});