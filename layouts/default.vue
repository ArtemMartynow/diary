<template>
  <div :class="currentLangClass">
    <slot
      v-if="isLoading === false" 
    />
    <LanguageSwitcher v-if="isLoading === false"  />
    <NuxtImg 
      src="../public/images/spinner-solid.svg" 
      alt="loading" 
      class="animate-spin w-20 mx-auto"
      v-else
    />
  </div>
</template>

<script setup>
import HomeApi from '~/api/home'
import { useHomeStore } from '../stores/homeStore'

const homeStore = useHomeStore()
const { locale } = useI18n()

const currentLangClass = computed(() => {
  return locale.value === 'en' ? 'h-screen flex items-center justify-center' : 'h-screen flex items-center justify-center ua';
})

let isLoading = ref(true)

onMounted(async () => {
  try { 
    await HomeApi.getNews()
    .then((response) => {
      homeStore.getNews(response)
    })
    await HomeApi.getFeedback()
    .then((response) => {
      homeStore.getFeedback(response)
      isLoading.value = false
    })
  } catch (error) { 
    console.error(error) 
  }
})
</script>