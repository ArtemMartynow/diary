<template>
  <div :class="currentLangClass">
    <NuxtImg 
      src="../public/images/spinner-solid.svg" 
      alt="loading" 
      class="animate-spin w-20 mx-auto"
      v-if="isLoading" 
    />
    <div 
      v-else
      class="flex w-full"
    >
      <Sidebar />
      <slot />
      <LanguageSwitcher />
    </div>
  </div>
</template>

<script setup>
import DiaryApi from '~/api/diary'

const { locale } = useI18n()

const isLoading = ref(process.client)
const currentLangClass = computed(() => {
  let langClass = 'h-screen flex items-center justify-center'
  return locale.value === 'en' ? langClass : `${langClass} ua`
})

if (process.client) {
  (async () => {
    try {
      Promise.all([
        await DiaryApi.getProfile(),
        await DiaryApi.getNotes()
      ])
    } catch (error) { 
      console.error('Error loading profile or notes:', error) 
    } finally {
      isLoading.value = false
    }
  })()
}
</script>