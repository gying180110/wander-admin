import request from '../utils/request'

export const createNoteApi = (payload) => {
  return request({
    url: '/notes',
    method: 'post',
    data: payload,
  })
}

export const listNoteApi = () => {
  return request({
    url: '/notes',
    method: 'get',
  })
}
