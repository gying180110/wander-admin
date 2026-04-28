import request from '../utils/request'

export const chatApi = (payload) => {
  return request({
    url: '/ai/chat',
    method: 'post',
    data: payload,
  })
}
