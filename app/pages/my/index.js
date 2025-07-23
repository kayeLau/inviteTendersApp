Page({
  data: {
    name:'点击登录',
    image: 'https://tdesign.gtimg.com/mobile/demos/avatar1.png',
    visible:false
  },
  onLoad() {

  },
  onVisibleChange() {
    const visible = !this.data.visible
    this.setData({
      visible: visible,
    });
  },


})
