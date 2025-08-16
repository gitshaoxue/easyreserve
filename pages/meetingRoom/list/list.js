// pages/meetingRoom/list/list.js
Page({
  data: {
    meetingRooms: [],
    searchKeyword: '',
    showFilter: false,
    capacityFilter: '',
    statusFilter: '',
    equipmentFilter: [],
    filteredRooms: []
  },

  onLoad: function() {
    // 加载会议室数据
    this.loadMeetingRooms()
  },

  onShow: function() {
    // 页面显示时重新加载数据
    this.loadMeetingRooms()
  },

  loadMeetingRooms: function() {
    // 模拟加载会议室数据
    // 实际应用中应该调用后端API
    const rooms = [
      {
        id: 1,
        name: '会议室A',
        capacity: 8,
        location: '1楼东区',
        status: 'available',
        statusText: '空闲',
        equipment: ['投影仪', '白板', '视频会议'],
        availableTime: ['09:00-10:00', '10:30-12:00', '14:00-16:00']
      },
      {
        id: 2,
        name: '会议室B',
        capacity: 12,
        location: '2楼西区',
        status: 'busy',
        statusText: '占用',
        equipment: ['投影仪', '白板', '视频会议', '音响'],
        availableTime: ['16:30-18:00', '19:00-21:00']
      },
      {
        id: 3,
        name: '会议室C',
        capacity: 4,
        location: '1楼南区',
        status: 'available',
        statusText: '空闲',
        equipment: ['投影仪', '白板'],
        availableTime: ['09:00-18:00']
      },
      {
        id: 4,
        name: '会议室D',
        capacity: 20,
        location: '3楼中区',
        status: 'maintaining',
        statusText: '维护中',
        equipment: ['投影仪', '白板', '视频会议', '音响', '直播设备'],
        availableTime: []
      },
      {
        id: 5,
        name: '会议室E',
        capacity: 6,
        location: '2楼北区',
        status: 'available',
        statusText: '空闲',
        equipment: ['投影仪', '白板', '视频会议'],
        availableTime: ['10:00-12:00', '13:00-15:00', '16:00-18:00']
      }
    ]

    this.setData({
      meetingRooms: rooms,
      filteredRooms: rooms
    })
  },

  onSearchInput: function(e) {
    this.setData({
      searchKeyword: e.detail.value
    })
    this.filterRooms()
  },

  openFilter: function() {
    this.setData({
      showFilter: !this.data.showFilter
    })
  },

  onCapacityFilterChange: function(e) {
    const value = e.currentTarget.dataset.value
    this.setData({
      capacityFilter: value
    })
  },

  onStatusFilterChange: function(e) {
    const value = e.currentTarget.dataset.value
    this.setData({
      statusFilter: value
    })
  },

  onEquipmentFilterChange: function(e) {
    const value = e.currentTarget.dataset.value
    const equipmentFilter = this.data.equipmentFilter

    if (equipmentFilter.includes(value)) {
      // 移除筛选条件
      const index = equipmentFilter.indexOf(value)
      equipmentFilter.splice(index, 1)
    } else {
      // 添加筛选条件
      equipmentFilter.push(value)
    }

    this.setData({
      equipmentFilter: equipmentFilter
    })
  },

  resetFilter: function() {
    this.setData({
      capacityFilter: '',
      statusFilter: '',
      equipmentFilter: []
    })
    this.filterRooms()
  },

  confirmFilter: function() {
    this.filterRooms()
    this.setData({
      showFilter: false
    })
  },

  filterRooms: function() {
    const { meetingRooms, searchKeyword, capacityFilter, statusFilter, equipmentFilter } = this.data
    let filteredRooms = meetingRooms

    // 关键词搜索
    if (searchKeyword) {
      filteredRooms = filteredRooms.filter(room => {
        return room.name.includes(searchKeyword) || room.location.includes(searchKeyword)
      })
    }

    // 容量筛选
    if (capacityFilter) {
      filteredRooms = filteredRooms.filter(room => {
        switch(capacityFilter) {
          case 'small':
            return room.capacity <= 4
          case 'medium':
            return room.capacity >= 5 && room.capacity <= 10
          case 'large':
            return room.capacity >= 11
          default:
            return true
        }
      })
    }

    // 状态筛选
    if (statusFilter) {
      filteredRooms = filteredRooms.filter(room => room.status === statusFilter)
    }

    // 设备筛选
    if (equipmentFilter.length > 0) {
      filteredRooms = filteredRooms.filter(room => {
        return equipmentFilter.every(equipment => room.equipment.includes(equipment))
      })
    }

    this.setData({
      filteredRooms: filteredRooms
    })
  },

  navigateToRoomDetail: function(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/meetingRoom/detail?id=${id}`
    })
  }
})