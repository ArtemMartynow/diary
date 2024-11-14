<template>
  <div class="diary-layout">
    <div v-if="diaryStore.isLoading === false" class="flex w-full">
      <Sidebar />
      <slot />
      <CreateNoteModal />
    </div>
    <NuxtImg 
      src="../public/images/spinner-solid.svg" 
      alt="loading" 
      class="animate-spin w-20 mx-auto"
      v-else
    />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import DiaryApi from '~/api/diary'
import { useDiaryStore } from '../stores/diaryStore'

const diaryStore = useDiaryStore()

onMounted(async () => {
  try { 
    await DiaryApi.getProfile() 
    await DiaryApi.getNotes()
  } catch (error) { 
    console.error('Error loading profile or notes:', error) 
  } finally { 
    diaryStore.setLoading(false)
  }
})
</script>