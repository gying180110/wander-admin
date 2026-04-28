import request from '../utils/request'

export const meApi = () =>
  request({
    url: '/auth/me',
    method: 'get',
  })

export const listUsersApi = () =>
  request({
    url: '/auth/users',
    method: 'get',
  })

export const createUserApi = (payload) =>
  request({
    url: '/auth/users',
    method: 'post',
    data: payload,
  })
