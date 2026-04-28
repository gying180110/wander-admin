<script setup>
import { reactive, ref, onMounted } from 'vue'
import { createChangelogApi, listChangelogApi } from '../api/changelog'

const logs = ref([])
const msg = ref('')
const form = reactive({
  versionNo: 'v1.1.0',
  moduleName: '',
  changePoint: '',
  changeFile: '',
})

const load = async () => {
  try {
    logs.value = await listChangelogApi()
  } catch (e) {
    msg.value = e.message
  }
}

const submit = async () => {
  try {
    await createChangelogApi(form)
    msg.value = '记录成功'
    form.moduleName = ''
    form.changePoint = ''
    form.changeFile = ''
    await load()
  } catch (e) {
    msg.value = e.message
  }
}

onMounted(load)
</script>

<template>
  <div class="notes-grid">
    <section class="page-card compose-card">
      <h2>版本改动登记</h2>
      <label>版本号</label>
      <input v-model="form.versionNo" />
      <label>模块</label>
      <input v-model="form.moduleName" placeholder="wander-hub-auth" />
      <label>改动点</label>
      <input v-model="form.changePoint" placeholder="新增角色权限字段" />
      <label>改动文件</label>
      <input v-model="form.changeFile" placeholder="path/to/file" />
      <button @click="submit">新增记录</button>
      <p class="tip">{{ msg }}</p>
    </section>
    <section class="page-card note-list-card">
      <h2>改动历史</h2>
      <ul class="list modern-list">
        <li v-for="item in logs" :key="item.id">
          <h3>{{ item.versionNo }} | {{ item.moduleName }}</h3>
          <p>{{ item.changePoint }}</p>
          <p class="tip">{{ item.changeFile }}</p>
        </li>
      </ul>
    </section>
  </div>
</template>
