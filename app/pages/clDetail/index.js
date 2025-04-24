import { downloadImg } from '../../server/api';
import { formatTime } from '../../utils/util';
const app = getApp()

Page({
  data: {
    filePath: 'http://localhost:3000/',
    stDetail: {},
    stImgs: [],
    visible:false,
    preViewImgs:""
  },

  getDetail() {
    const stDetail = app.globalData.workRecordDetail
    stDetail.dateString = formatTime(new Date(parseInt(stDetail.attendanceDate)))
    stDetail.suffix = stDetail.type === 0 ? '天' : '小时'
    const stImgs = stDetail.recordImg ? stDetail.recordImg.split(',') : []
    this.getImg(stImgs)
    this.setData({ stDetail })
  },

  getImg(imgs) {
    if(!imgs.length)return;
    downloadImg(imgs).then(stImgs => {
      this.setData({ stImgs })
    })
  },

  showPreview(e) {
    console.log(e)
    this.setData({
      visible: true,
    });
  },

  closePreview() {
    this.setData({
      visible: false,
    });
  },

  onLoad() {
    this.getDetail()
  },

})