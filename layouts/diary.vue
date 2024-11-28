<template>
  <div :class="currentLangClass">
    <div 
      v-if="diaryStore.isLoading === false" 
      class="flex w-full"
    >
      <Sidebar />
      <slot />
      <LanguageSwitcher />
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
import DiaryApi from '~/api/diary'
import { useDiaryStore } from '../stores/diaryStore'

const diaryStore = useDiaryStore()

const { locale } = useI18n()

const currentLangClass = computed(() => {
  return locale.value === 'en' ? 'h-screen flex items-center justify-center' : 'h-screen flex items-center justify-center ua';
})

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