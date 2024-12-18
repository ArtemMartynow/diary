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
      <input type="text" placeholder="Author" class="ml-2" v-model="filterAuthor">
      <input type="text" placeholder="Tags" class="mx-2" v-model="filterTags">
      <VSelect 
        :options="options"
        :noValue="'Sort by date'"
        v-model="sortDate"
      />
    </div>
    <ContentCard 
      v-for="news in filteredNews"
      :key="news.id"
      :title="news.title"
      :text="news.text"
      :date="news.createdAt"
      :author="news.author"
      :tags="news.tags"
    />
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
import { useHomeStore } from '../stores/homeStore'

const homeStore = useHomeStore()
const localePath = useLocalePath()
const router = useRouter() 

let options = ref([
  {
    name: 'Sort by date',
    value: ''
  },
  {
    name: 'Ascending',
    value: 'ascending'
  },
  {
    name: 'Descending',
    value: 'descending'
  }
])

const filterAuthor = ref('') 
const filterTags = ref('') 
const sortDate = ref('') 
const filteredNews = computed(() => { 
  let news = homeStore.news 
  if (filterAuthor.value) { 
    news = news.filter(n => n.author.toLowerCase().includes(filterAuthor.value.toLowerCase())) 
  } 
  if (filterTags.value) { 
    const tagsArray = filterTags.value.split(',').map(tag => tag.trim().toLowerCase()) 
    news = news.filter(n => { 
      return tagsArray.some(tag => n.tags.some(newsTag => newsTag.toLowerCase().includes(tag))) 
    }) 
  }

  if (sortDate.value === 'ascending') { 
    news = news.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)) 
  } else if (sortDate.value === 'descending') { 
    news = news.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) 
  } 
    
  return news 
})

const updateQueryParams = () => { 
  const query = {} 
  if (filterAuthor.value) {
    query.author = filterAuthor.value
  } 
  if (filterTags.value) {
    query.tags = filterTags.value
  } 
  if (sortDate.value) {
    query['sort-date'] = sortDate.value
  } 
  router.push({ path: '/', query }) 
} 
watch([filterAuthor, filterTags, sortDate], () => { 
  updateQueryParams() 
}, { immediate: true })
</script>