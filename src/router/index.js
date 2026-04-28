import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import LoginView from '../views/LoginView.vue'
import HomeLayout from '../layout/HomeLayout.vue'
import NoteView from '../views/NoteView.vue'
import AiView from '../views/AiView.vue'

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
        { path: '/ai', component: AiView },
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
  return true
})

export default router
