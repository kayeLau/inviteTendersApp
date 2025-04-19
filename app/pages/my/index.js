// logs.js
import { formatTime } from '../../utils/dict.js';

Page({
  data: {
    logs: []
  },
  onLoad() {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return {
          date: formatTime(new Date(log),'dateTime'),
          timeStamp: log
        }
      })
    })
  }
})
