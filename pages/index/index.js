// pages/index/index.js
Page({
  data: {
    userInfo: {},
    currentOrganization: {},
    currentEnterprise: {},
    upcomingMeetings: [],
    availableRooms: []
  },

  onLoad: function() {
    // 获取全局数据
    const app = getApp()
    this.setData({
      userInfo: app.globalData.userInfo,
      currentOrganization: app.globalData.currentOrganization,
      currentEnterprise: app.globalData.currentEnterprise
    })

    // 加载近期会议数据
    this.loadUpcomingMeetings()

    // 加载可用会议室数据
    this.loadAvailableRooms()
  },

  onShow: function() {
    // 页面显示时重新加载数据
    this.loadUpcomingMeetings()
    this.loadAvailableRooms()
  },

  loadUpcomingMeetings: function() {
    // 模拟加载近期会议数据
    // 实际应用中应该调用后端API
    const meetings = [
      {
        id: 1,
        title: '产品需求讨论会',
        room: '会议室A',
        date: '今天',
        time: '14:00-15:30',
        status: 'upcoming',
        statusText: '即将开始'
      },
      {
        id: 2,
        title: '技术评审会',
        room: '会议室B',
        date: '明天',
        time: '10:00-11:30',
        status: 'upcoming',
        statusText: '即将开始'
      }
    ]

    this.setData({
      upcomingMeetings: meetings
    })
  },

  loadAvailableRooms: function() {
    // 模拟加载可用会议室数据
    // 实际应用中应该调用后端API
    const rooms = [
      {
        id: 1,
        name: '会议室A',
        capacity: 8,
        status: 'available',
        equipment: ['投影仪', '白板', '视频会议']
      },
      {
        id: 2,
        name: '会议室C',
        capacity: 4,
        status: 'available',
        equipment: ['投影仪', '白板']
      },
      {
        id: 3,
        name: '会议室D',
        capacity: 12,
        status: 'available',
        equipment: ['投影仪', '白板', '视频会议', '音响']
      }
    ]

    this.setData({
      availableRooms: rooms
    })
  },

  navigateToReservation: function() {
    wx.navigateTo({
      url: '/pages/reservation/create'
    })
  },

  navigateToMeetingRooms: function() {
    wx.switchTab({
      url: '/pages/meetingRoom/list'
    })
  },

  navigateToMyReservations: function() {
    wx.switchTab({
      url: '/pages/reservation/list'
    })
  },

  navigateToScan: function() {
    // 调用微信扫码API
    wx.scanCode({
      success: (res) => {
        // 扫码成功后的处理逻辑
        console.log('扫码结果:', res)
        wx.showToast({
          title: '签到成功',
          icon: 'success'
        })
      },
      fail: (err) => {
        console.error('扫码失败:', err)
        wx.showToast({
          title: '扫码失败',
          icon: 'none'
        })
      }
    })
  },

  navigateToMeetingDetail: function(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/reservation/detail?id=${id}`
    })
  },

  navigateToRoomDetail: function(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/meetingRoom/detail?id=${id}`
    })
  }
})