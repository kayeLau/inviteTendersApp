// app.js
import { checkSession } from './server/auth.js';
App({
  onLaunch() {
    checkSession()
  },

  globalData: {
    userInfo: null,
    currentBidDetail:{}
  },
})
