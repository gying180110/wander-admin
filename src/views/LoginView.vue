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
  <div class="page-card">
    <h1>登录系统</h1>
    <label>账号</label>
    <input v-model="form.username" placeholder="请输入账号" />
    <label>密码</label>
    <input v-model="form.password" type="password" placeholder="请输入密码" />
    <button :disabled="loading" @click="login">{{ loading ? '登录中...' : '登录' }}</button>
    <p class="tip">默认账号：admin / 123456</p>
    <p v-if="msg" class="error">{{ msg }}</p>
  </div>
</template>
