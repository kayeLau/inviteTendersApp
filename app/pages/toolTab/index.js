import { config } from '../../assert/config.js';

Page({
  data: {
    activeTab:1,
    id:'',
    path:'',
    config: []
  },

  onLoad: function(option){
    console.log(config[option.path])
    this.setData({
      'id':option.id,
      'path':option.path,
      'config':config[option.id]
    })
  }
});