<script setup>
import { reactive, ref, onMounted } from 'vue'
import { createNoteApi, listNoteApi } from '../api/note'

const notes = ref([])
const loading = ref(false)
const msg = ref('')

const form = reactive({
  title: '',
  content: '',
})

const loadNotes = async () => {
  loading.value = true
  try {
    notes.value = await listNoteApi()
  } catch (e) {
    msg.value = e.message
  } finally {
    loading.value = false
  }
}

const submit = async () => {
  if (!form.title || !form.content) {
    msg.value = '标题和内容不能为空'
    return
  }
  try {
    await createNoteApi(form)
    form.title = ''
    form.content = ''
    msg.value = '保存成功'
    await loadNotes()
  } catch (e) {
    msg.value = e.message
  }
}

onMounted(loadNotes)
</script>

<template>
  <div class="page-card">
    <h1>笔记管理</h1>
    <label>标题</label>
    <input v-model="form.title" placeholder="输入笔记标题" />
    <label>内容</label>
    <textarea v-model="form.content" rows="4" placeholder="输入笔记内容" />
    <button @click="submit">保存笔记</button>
    <p v-if="msg" class="tip">{{ msg }}</p>

    <h2>我的笔记</h2>
    <p v-if="loading">加载中...</p>
    <ul v-else class="list">
      <li v-for="item in notes" :key="item.id">
        <h3>{{ item.title }}</h3>
        <p>{{ item.content }}</p>
      </li>
    </ul>
  </div>
</template>
