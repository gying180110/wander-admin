<script setup>
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const go = (path) => router.push(path)
const logout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <div class="layout">
    <aside class="sidebar">
      <h2>Wander Admin</h2>
      <p class="user">你好，{{ authStore.user.nickname || authStore.user.username }}</p>
      <button @click="go('/notes')">笔记管理</button>
      <button @click="go('/ai')">AI 助手</button>
      <button class="danger" @click="logout">退出登录</button>
    </aside>
    <main class="main">
      <router-view />
    </main>
  </div>
</template>
