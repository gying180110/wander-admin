<script setup>
import { reactive, ref, onMounted } from 'vue'
import { createUserApi, listUsersApi } from '../api/user'

const users = ref([])
const message = ref('')
const allPermissions = [
  'USER_MANAGE',
  'AI_CHAT',
  'ANNOUNCEMENT_MANAGE',
  'CHANGELOG_MANAGE',
]
const form = reactive({
  username: '',
  password: '',
  nickname: '',
  roleCode: 'EDITOR',
  permissions: '',
})

const permissionTemplates = {
  ADMIN: 'USER_MANAGE,AI_CHAT,ANNOUNCEMENT_MANAGE,CHANGELOG_MANAGE',
  EDITOR: 'AI_CHAT,ANNOUNCEMENT_MANAGE,CHANGELOG_MANAGE',
  VIEWER: 'AI_CHAT',
}

const onRoleChange = () => {
  resetByRole()
}

const selectedPermissions = ref([])
const syncPermissionString = () => {
  form.permissions = selectedPermissions.value.join(',')
}

const resetByRole = () => {
  selectedPermissions.value = (permissionTemplates[form.roleCode] || '')
    .split(',')
    .filter(Boolean)
  syncPermissionString()
}

const loadUsers = async () => {
  try {
    users.value = await listUsersApi()
  } catch (e) {
    message.value = e.message
  }
}

const submit = async () => {
  try {
    await createUserApi(form)
    message.value = '用户创建成功'
    form.username = ''
    form.password = ''
    form.nickname = ''
    resetByRole()
    await loadUsers()
  } catch (e) {
    message.value = e.message
  }
}

onMounted(loadUsers)
onMounted(resetByRole)
</script>

<template>
  <div class="notes-grid">
    <section class="page-card compose-card">
      <h2>新增用户</h2>
      <label>用户名</label>
      <input v-model="form.username" placeholder="例如 tester01" />
      <label>密码</label>
      <input v-model="form.password" type="password" />
      <label>昵称</label>
      <input v-model="form.nickname" />
      <label>角色</label>
      <select v-model="form.roleCode" @change="onRoleChange">
        <option value="ADMIN">ADMIN</option>
        <option value="EDITOR">EDITOR</option>
        <option value="VIEWER">VIEWER</option>
      </select>
      <label>权限勾选</label>
      <div class="perm-grid">
        <label v-for="perm in allPermissions" :key="perm" class="perm-item">
          <input
            type="checkbox"
            :value="perm"
            v-model="selectedPermissions"
            @change="syncPermissionString"
          />
          <span>{{ perm }}</span>
        </label>
      </div>
      <button @click="submit">保存用户</button>
      <p class="tip">{{ message }}</p>
    </section>

    <section class="page-card note-list-card">
      <div class="section-title">
        <h2>用户列表</h2>
        <span>{{ users.length }} 人</span>
      </div>
      <ul class="list modern-list">
        <li v-for="u in users" :key="u.id">
          <h3>{{ u.nickname }} ({{ u.username }})</h3>
          <p>角色: {{ u.roleCode }} | 权限: {{ u.permissions || '无' }}</p>
        </li>
      </ul>
    </section>
  </div>
</template>
