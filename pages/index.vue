<template>
<div class="home h-screen w-full text-center">
  <h1>{{ $t('welcome') }}</h1>
  <p>{{ $t('welcome_description') }}</p>
  <div class="home__links flex justify-between">
    <NuxtLink :to="localePath('/auth/login')">{{ $t('login') }}</NuxtLink>
    <NuxtLink :to="localePath('/auth/sign-up')">{{ $t('sign_up') }}</NuxtLink>
  </div>
  <div class="home__news">
    <h2 class="text-4xl mb-2">{{ $t('news') }}</h2>
    <div class="home__filter flex items-center justify-center mb-5">
      <span>Filter:</span>
      <input @input="sortNews()" type="text" placeholder="Author" class="ml-2" v-model="filterAuthor">
    </div>
    <template v-if="!isLoading">
      <ContentCard 
        v-for="news in homeStore.news"
        :key="news.id"
        :title="news.title"
        :text="news.text"
        :date="news.createdAt"
        :author="news.author"
        :tags="news.tags"
      />
    </template>
    <NuxtImg 
      src="/images/spinner-solid.svg" 
      alt="loading" 
      class="animate-spin w-20 mx-auto"
      v-else 
    />
    <h3 
      v-if="homeStore.news.length === 0 && !isLoading"
      class="text-4xl py-10 rounded-3xl"  
    >News not found</h3>
  </div>
  <div class="home__feedback">
    <h2 class="text-4xl mb-2">{{ $t('feedback') }}</h2>
    <ContentCard 
      v-for="feedback in homeStore.feedback"
      :key="feedback.id"
      :title="feedback.username"
      :text="feedback.text"
    />
  </div>
</div>
</template>

<script setup>
import HomeApi from '~/api/home'
import { debounce } from 'lodash'

const homeStore = useHomeStore()
const localePath = useLocalePath()
const router = useRouter() 
const route = useRoute()

let isLoading = ref(false)
const filterAuthor = ref(route.query.author || '') 

const updateQueryParams = debounce(() => { 
  const query = {} 
  if (filterAuthor.value) {
    query.author = filterAuthor.value
  } 
  router.push({ path: route.path, query })
  HomeApi.getNews(query)
  .then((response) => {
    homeStore.getNews(response) 
    isLoading.value = false
  })
}, 1000)

const sortNews = () => {
  isLoading.value = true
  updateQueryParams()
}

const { data } = useAsyncData('homeData', async () => { 
  const [newsResponse, feedbackResponse] = await Promise.all([ 
    HomeApi.getNews(), 
    HomeApi.getFeedback() 
  ]) 
  homeStore.getNews(newsResponse) 
  homeStore.getFeedback(feedbackResponse) 
  return { newsResponse, feedbackResponse }
})

watch([filterAuthor], () => { 
  updateQueryParams() 
}, { immediate: true })
</script>