// pages/login/login.js
Page({
  data: {
    username: '',
    password: '',
    organizations: ['测试组织1', '测试组织2', '测试组织3'],
    organizationIndex: 0,
    enterprises: ['测试企业1', '测试企业2', '测试企业3'],
    enterpriseIndex: 0
  },

  onLoad: function() {
    // 页面加载时执行
    // 可以在这里获取组织和企业数据
  },

  onUsernameInput: function(e) {
    this.setData({
      username: e.detail.value
    })
  },

  onPasswordInput: function(e) {
    this.setData({
      password: e.detail.value
    })
  },

  onOrganizationChange: function(e) {
    this.setData({
      organizationIndex: e.detail.value
    })
    // 这里可以根据选择的组织加载对应的企业
    this.loadEnterprisesByOrganization(e.detail.value)
  },

  onEnterpriseChange: function(e) {
    this.setData({
      enterpriseIndex: e.detail.value
    })
  },

  loadEnterprisesByOrganization: function(organizationIndex) {
    // 模拟根据组织加载企业数据
    let enterprises
    switch(organizationIndex) {
      case 0:
        enterprises = ['测试企业1-1', '测试企业1-2']
        break
      case 1:
        enterprises = ['测试企业2-1', '测试企业2-2', '测试企业2-3']
        break
      case 2:
        enterprises = ['测试企业3-1']
        break
      default:
        enterprises = ['测试企业1', '测试企业2', '测试企业3']
    }
    this.setData({
      enterprises: enterprises,
      enterpriseIndex: 0
    })
  },

  login: function() {
    const { username, password, organizations, organizationIndex, enterprises, enterpriseIndex } = this.data

    if (!username || !password) {
      wx.showToast({
        title: '请输入用户名和密码',
        icon: 'none'
      })
      return
    }

    // 模拟登录请求
    wx.showLoading({
      title: '登录中...',
    })

    // 这里应该调用后端API进行登录验证
    // 为简化示例，这里假设登录成功
    setTimeout(() => {
      wx.hideLoading()

      // 保存登录状态
      wx.setStorageSync('token', 'test_token')
      wx.setStorageSync('userInfo', {
        id: 1,
        name: username,
        avatar: '/images/avatar.png',
        organization: organizations[organizationIndex],
        enterprise: enterprises[enterpriseIndex]
      })

      // 更新全局数据
      const app = getApp()
      app.globalData.userInfo = {
        id: 1,
        name: username,
        avatar: '/images/avatar.png'
      }
      app.globalData.currentOrganization = {
        id: organizationIndex + 1,
        name: organizations[organizationIndex]
      }
      app.globalData.currentEnterprise = {
        id: enterpriseIndex + 1,
        name: enterprises[enterpriseIndex]
      }

      // 跳转到首页
      wx.switchTab({
        url: '/pages/index/index'
      })
    }, 1000)
  }
})