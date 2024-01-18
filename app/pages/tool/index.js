Page({
  data: {
    role: [{
        name: '设置工地'
      },
      {
        name: '记录考勤'
      },
      {
        name: '记录'
      }
    ],
    column: [{
      type: 'picker',
      label: '当前工地',
      value: 0,
      options: [{
          id: 0,
          name: '美国',
        },
        {
          id: 1,
          name: '中国',
        },
      ]
    }, ]
  },

  jumpTo(event) {
    wx.navigateTo({
      url: '/pages/tool/index'
    })
  },

  onLoad: function(option){
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptDataFromOpenerPage', function(data) {
      console.log(data)
    })
  }
});