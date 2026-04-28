import request from '../utils/request'

export const playAnnouncementsApi = () =>
  request({
    url: '/announcements/play',
    method: 'get',
  })

export const listAnnouncementsApi = () =>
  request({
    url: '/announcements',
    method: 'get',
  })

export const createAnnouncementApi = (payload) =>
  request({
    url: '/announcements',
    method: 'post',
    data: payload,
  })
