// app.js
import { promisifyAll } from 'miniprogram-api-promise'

const wxp = wx.p = {}
promisifyAll(wx, wxp)

App({
  globalData: {
    userInfo: null,
    currentOrganization: null,
    currentEnterprise: null
  },

  onLaunch() {
    // 初始化云开发环境（虽然需求说不使用云服务，但这里保留初始化代码，实际可根据需求调整）
    // wx.cloud.init({
    //   env: 'your-env-id',
    //   traceUser: true,
    // })

    // 检查登录状态
    this.checkLoginStatus()
  },

  checkLoginStatus() {
    const token = wx.getStorageSync('token')
    if (token) {
      // 验证token有效性
      this.validateToken(token)
    } else {
      // 未登录，跳转到登录页面
      wx.redirectTo({
        url: '/pages/login/login'
      })
    }
  },

  validateToken(token) {
    // 这里应该调用后端API验证token
    // 为简化示例，这里假设验证通过
    this.globalData.userInfo = { id: 1, name: '测试用户', avatar: '/images/avatar.png' }
    this.globalData.currentOrganization = { id: 1, name: '测试组织' }
    this.globalData.currentEnterprise = { id: 1, name: '测试企业' }
  }
})