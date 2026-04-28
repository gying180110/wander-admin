import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import LoginView from '../views/LoginView.vue'
import HomeLayout from '../layout/HomeLayout.vue'
import NoteView from '../views/NoteView.vue'
import AiView from '../views/AiView.vue'
import UserView from '../views/UserView.vue'
import AnnouncementView from '../views/AnnouncementView.vue'
import ChangeLogView from '../views/ChangeLogView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/login', component: LoginView, meta: { guest: true } },
    {
      path: '/',
      component: HomeLayout,
      children: [
        { path: '', redirect: '/notes' },
        { path: '/notes', component: NoteView },
        { path: '/ai', component: AiView, meta: { perm: 'AI_CHAT' } },
        { path: '/users', component: UserView, meta: { perm: 'USER_MANAGE' } },
        { path: '/announcements', component: AnnouncementView, meta: { perm: 'ANNOUNCEMENT_MANAGE' } },
        { path: '/changelog', component: ChangeLogView, meta: { perm: 'CHANGELOG_MANAGE' } },
      ],
    },
  ],
})

router.beforeEach((to) => {
  const authStore = useAuthStore()
  if (!to.meta.guest && !authStore.token) {
    return '/login'
  }
  if (to.path === '/login' && authStore.token) {
    return '/notes'
  }
  if (to.meta.perm && !authStore.isAdmin && !authStore.permissionSet.has(to.meta.perm)) {
    return '/notes'
  }
  return true
})

export default router
