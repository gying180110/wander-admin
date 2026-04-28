<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { loginApi } from '../api/auth'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = reactive({
  username: 'admin',
  password: '123456',
})
const loading = ref(false)
const msg = ref('')

const login = async () => {
  loading.value = true
  msg.value = ''
  try {
    const data = await loginApi(form)
    authStore.setLogin(data)
    router.push('/notes')
  } catch (e) {
    msg.value = e.message
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login-shell">
    <section class="login-banner">
      <h1>Wander Workspace</h1>
      <p>更现代的后台系统，聚合登录、笔记与 AI 能力。</p>
    </section>

    <section class="login-card">
      <h2>欢迎登录</h2>
      <p class="tip">默认账号：admin / 123456</p>
      <label>账号</label>
      <input v-model="form.username" placeholder="请输入账号" />
      <label>密码</label>
      <input v-model="form.password" type="password" placeholder="请输入密码" />
      <button :disabled="loading" @click="login">
        {{ loading ? '登录中...' : '进入系统' }}
      </button>
      <p v-if="msg" class="error">{{ msg }}</p>
    </section>
  </div>
</template>
