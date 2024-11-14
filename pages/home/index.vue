<template>
  <div class="home-page">
    <h1 v-if="Object.keys(diaryStore.selectedNote).length === 0">
      There is no note selected. Select an existing 
      note or add a new one to continue.
    </h1>
    <div v-else class="home-page__content">
      <h2>{{ diaryStore.selectedNote.title }}</h2>
      <p>{{ diaryStore.selectedNote.text }}</p>
      <span>{{ reverseDate(diaryStore.selectedNote.date) }}</span>
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
import { reverseDate } from '~/helpers/customFunctions'
import { useDiaryStore } from '../stores/diaryStore'

const diaryStore = useDiaryStore()  

onMounted(async () => {
  try { 
    await DiaryApi.getProfile() 
    await DiaryApi.getNotes()
  } catch (error) { 
    console.error('Error loading profile or notes:', error) 
  }
})
</script>