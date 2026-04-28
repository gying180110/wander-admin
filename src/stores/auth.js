import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('wander_token') || '',
    user: JSON.parse(localStorage.getItem('wander_user') || '{}'),
  }),
  actions: {
    setLogin(data) {
      this.token = data.token
      this.user = { username: data.username, nickname: data.nickname }
      localStorage.setItem('wander_token', data.token)
      localStorage.setItem('wander_user', JSON.stringify(this.user))
    },
    logout() {
      this.token = ''
      this.user = {}
      localStorage.removeItem('wander_token')
      localStorage.removeItem('wander_user')
    },
  },
})
