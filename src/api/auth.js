import request from '../utils/request'

export const loginApi = (payload) => {
  return request({
    url: '/auth/login',
    method: 'post',
    data: payload,
  })
}
