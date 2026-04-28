<script setup>
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { playAnnouncementsApi } from '../api/announcement'
import { normalizeText } from '../utils/text'

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

const go = (path) => router.push(path)
const logout = () => {
  authStore.logout()
  router.push('/login')
}

const baseMenus = [
  { path: '/notes', title: '笔记中心', desc: '记录与管理知识' },
  { path: '/ai', title: 'AI 工作台', desc: '智能问答助手' },
  { path: '/announcements', title: '公告中心', desc: '发布与播放公告', perm: 'ANNOUNCEMENT_MANAGE' },
  { path: '/changelog', title: '改动记录', desc: '版本升级记录', perm: 'CHANGELOG_MANAGE' },
  { path: '/users', title: '用户权限', desc: '用户/角色/权限管理', perm: 'USER_MANAGE' },
]

const titleMap = {
  '/notes': '笔记中心',
  '/ai': 'AI 工作台',
  '/announcements': '公告中心',
  '/changelog': '改动记录',
  '/users': '用户权限管理',
}

const menus = computed(() =>
  baseMenus.filter((item) => !item.perm || authStore.isAdmin || authStore.permissionSet.has(item.perm)),
)

const pageTitle = computed(() => titleMap[route.path] || '工作台')

const playlist = ref([])
const noticeIndex = ref(0)
const currentNotice = ref(null)
let noticeTimer = null

const startNoticePlayer = () => {
  if (noticeTimer) clearInterval(noticeTimer)
  if (!playlist.value.length) return
  currentNotice.value = playlist.value[noticeIndex.value % playlist.value.length]
  noticeTimer = setInterval(() => {
    noticeIndex.value += 1
    currentNotice.value = playlist.value[noticeIndex.value % playlist.value.length]
  }, (currentNotice.value?.playSeconds || 5) * 1000)
}

onMounted(async () => {
  try {
    playlist.value = await playAnnouncementsApi()
    startNoticePlayer()
  } catch (e) {
    currentNotice.value = null
  }
})
</script>

<template>
  <div class="layout">
    <aside class="sidebar">
      <h2 class="brand">Wander Admin</h2>
      <p class="sidebar-subtitle">Modern Knowledge Workspace</p>
      <p class="user">
        <span>当前用户</span>
        <strong>{{ authStore.user.nickname || authStore.user.username }}</strong>
      </p>

      <nav class="menu-list">
        <button
          v-for="item in menus"
          :key="item.path"
          :class="['menu-btn', { active: route.path === item.path }]"
          @click="go(item.path)"
        >
          <strong>{{ item.title }}</strong>
          <small>{{ item.desc }}</small>
        </button>
      </nav>

      <button class="danger" @click="logout">退出登录</button>
    </aside>
    <main class="main">
      <header class="page-header">
        <h1>{{ pageTitle }}</h1>
        <p>统一设计语言、清晰信息层级、可扩展后台布局</p>
        <div v-if="currentNotice" class="notice-player">
          <strong>{{ normalizeText(currentNotice.title) }}</strong>
          <span>{{ normalizeText(currentNotice.content) }}</span>
        </div>
      </header>
      <router-view />
    </main>
  </div>
</template>
