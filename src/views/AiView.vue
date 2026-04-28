<script setup>
import { reactive, ref } from 'vue'
import { chatApi } from '../api/ai'

const form = reactive({
  prompt: '',
})
const answer = ref('')
const loading = ref(false)
const msg = ref('')

const send = async () => {
  if (!form.prompt) {
    msg.value = '请输入提问内容'
    return
  }
  loading.value = true
  msg.value = ''
  try {
    const data = await chatApi({ prompt: form.prompt })
    answer.value = data.answer
  } catch (e) {
    msg.value = e.message
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="page-card">
    <h1>AI 助手</h1>
    <textarea v-model="form.prompt" rows="5" placeholder="输入你的问题..." />
    <button :disabled="loading" @click="send">
      {{ loading ? '处理中...' : '发送给 AI' }}
    </button>
    <p v-if="msg" class="error">{{ msg }}</p>
    <div v-if="answer" class="answer">
      <h3>AI 回复</h3>
      <p>{{ answer }}</p>
    </div>
  </div>
</template>
