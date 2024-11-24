<template>
  <div class="h-screen flex items-center justify-center">
    <slot
      v-if="isLoading === false" 
    />
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

let isLoading = ref(true)
onMounted(async () => {
  try { 
    await HomeApi.getNews()
    .then((response) => {
      homeStore.getNews(response)
      isLoading.value = false
    })
  } catch (error) { 
    console.error(error) 
  }
})
</script>