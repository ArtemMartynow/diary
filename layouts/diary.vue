<template>
  <div class="diary-layout">
    <div 
      v-if="diaryStore.isLoading === false" 
      class="flex w-full"
    >
      <Sidebar />
      <slot />
      <div
        class="app-language absolute right-5 bottom-5"
        v-if="diaryStore.isLoading === false"   
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
import { useHomeStore } from '../stores/homeStore'

const diaryStore = useDiaryStore()
const homeStore = useHomeStore()
const route = useRoute()
const router = useRouter()
let currentUrl = route.fullPath

const changeLang = (lang) => {
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
    if (currentUrl.slice(0, 3) === '/ua') {
      homeStore.changeLangUa()
    } else {
      homeStore.changeLangEn()
    }
    await DiaryApi.getProfile() 
    await DiaryApi.getNotes()
  } catch (error) { 
    console.error('Error loading profile or notes:', error) 
  } finally { 
    diaryStore.setLoading(false)
  }
})
</script>