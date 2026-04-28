<script setup>
import { reactive, ref, onMounted } from 'vue'
import {
  createAnnouncementApi,
  listAnnouncementsApi,
  playAnnouncementsApi,
} from '../api/announcement'

const allList = ref([])
const playList = ref([])
const idx = ref(0)
const now = ref(null)
const msg = ref('')
let timer = null

const form = reactive({
  title: '',
  content: '',
  active: 1,
  playSeconds: 5,
  sortNo: 100,
})

const startPlay = () => {
  if (timer) clearInterval(timer)
  if (!playList.value.length) return
  now.value = playList.value[idx.value % playList.value.length]
  timer = setInterval(() => {
    idx.value += 1
    now.value = playList.value[idx.value % playList.value.length]
  }, (now.value?.playSeconds || 5) * 1000)
}

const load = async () => {
  try {
    allList.value = await listAnnouncementsApi()
    playList.value = await playAnnouncementsApi()
    idx.value = 0
    startPlay()
  } catch (e) {
    msg.value = e.message
  }
}

const submit = async () => {
  try {
    await createAnnouncementApi(form)
    msg.value = '公告发布成功'
    form.title = ''
    form.content = ''
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
      <h2>公告发布</h2>
      <label>标题</label>
      <input v-model="form.title" />
      <label>内容</label>
      <textarea v-model="form.content" rows="5" />
      <label>播放秒数</label>
      <input v-model.number="form.playSeconds" type="number" />
      <button @click="submit">发布公告</button>
      <p class="tip">{{ msg }}</p>
    </section>
    <section class="page-card note-list-card">
      <h2>公告播放预览</h2>
      <div class="answer modern-answer" v-if="now">
        <h3>{{ now.title }}</h3>
        <p>{{ now.content }}</p>
      </div>
      <h2 style="margin-top: 16px">全部公告</h2>
      <ul class="list modern-list">
        <li v-for="item in allList" :key="item.id">
          <h3>{{ item.title }}</h3>
          <p>{{ item.content }}</p>
        </li>
      </ul>
    </section>
  </div>
</template>
