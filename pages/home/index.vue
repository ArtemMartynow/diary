<template>
  <div class="home-page">
    <h1 v-if="diaryStore.user !== {}">
      There is no note selected. Select an existing 
      note or add a new one to continue.
    </h1>
    <div v-else class="home-page__content">
      <h2>test1</h2>
      <p>
        asdsadasdasdasdsadasdwdsadawdsadawdsadawdasdawdswadsadasdawsdsadawsdwads
      </p>
      <span>20-20-2020</span>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'diary',
  middleware: 'auth'
})
import DiaryApi from '~/api/diary'
import { onMounted } from 'vue'
import { useDiaryStore } from '../stores/diaryStore'

const diaryStore = useDiaryStore()  

onMounted(() => {
  // DiaryApi.getProfile()
})
</script>