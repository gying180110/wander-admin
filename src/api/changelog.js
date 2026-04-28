import request from '../utils/request'

export const listChangelogApi = () =>
  request({
    url: '/changelog',
    method: 'get',
  })

export const createChangelogApi = (payload) =>
  request({
    url: '/changelog',
    method: 'post',
    data: payload,
  })
