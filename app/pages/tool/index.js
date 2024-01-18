import { config } from './config.js';

Page({
  data: {
    active:1,
    path:'',
    component:'',
    column: []
  },

  onChange(event) {
    wx.showToast({
      title: `切换到标签 ${event.detail.index + 1}`,
      icon: 'none'
    });
  },

  onLoad: function(option){
    this.setData({
      'path':option.path,
      'component':option.component,
      'column':config[option.path]
    })
  }
});