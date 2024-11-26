<template>
  <div class="h-screen flex items-center justify-center">
    <slot
      v-if="isLoading === false" 
    />
    <div
      class="app-language absolute right-5 bottom-5"
      v-if="isLoading === false"   
    >
      <span 
        :class="homeStore.lang === 'en' ? 'lang-active' : ''"
        @click="changeLang(homeStore.lang)"  
      >en</span>
      <span 
        :class="homeStore.lang === 'ua' ? 'lang-active' : ''"
        @click="changeLang(homeStore.lang)"  
      >ua</span>
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
import HomeApi from '~/api/home'
import { useHomeStore } from '../stores/homeStore'

const homeStore = useHomeStore()
const route = useRoute()
const router = useRouter()

let isLoading = ref(true)

const changeLang = (lang) => {
  let currentUrl = route.fullPath
  if (currentUrl === '/ua' && lang === 'ua') {
    homeStore.changeLangEn()
    router.push('/')
  } else if (lang === 'ua') {
    homeStore.changeLangEn()
    router.push(`/en${currentUrl.slice(3)}`)
  } else if (lang === 'en') {
    homeStore.changeLangUa()
    router.push(`/ua${currentUrl.slice(3)}`)
  }
}

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