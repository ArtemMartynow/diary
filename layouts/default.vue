<template>
  <div :class="currentLangClass">
    <NuxtImg 
      src="../public/images/spinner-solid.svg" 
      alt="loading" 
      class="animate-spin w-20 mx-auto"
      v-if="isClient && isLoading"
    />
    <slot
      v-else 
    />
    <LanguageSwitcher v-if="!isLoading"  />
  </div>
</template>

<script setup>
import HomeApi from '~/api/home'
import { useHomeStore } from '../stores/homeStore'

const homeStore = useHomeStore()
const { locale } = useI18n()

const isLoading = ref(process.client)
const isClient = ref(process.client) 
const currentLangClass = computed(() => {
  let langClass = 'h-screen flex items-center justify-center'
  return locale.value === 'en' ? langClass : `${langClass} ua`
})

if (process.client) {
  (async () => {
    try {
      const [newsResponse, feedbackResponse] = await Promise.all([
        HomeApi.getNews(),
        HomeApi.getFeedback()
      ])
      homeStore.getNews(newsResponse)
      homeStore.getFeedback(feedbackResponse)
    } catch (error) {
      console.error(error)
    } finally {
      isLoading.value = false
    }
  })()
}
</script>