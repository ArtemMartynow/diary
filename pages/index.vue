<template>
<div class="home">
  <h1>{{ $t('welcome') }}</h1>
  <p>{{ $t('welcome_description') }}</p>
  <div class="home__links">
    <NuxtLink to="/auth/login">{{ $t('login') }}</NuxtLink>
    <NuxtLink to="/auth/sign-up">{{ $t('sign_up') }}</NuxtLink>
  </div>
  <div class="home__news">
    <h2 class="text-4xl">{{ $t('news') }}</h2>
    <ContentCard 
      v-for="news in homeStore.news"
      :key="news.id"
      :title="news.title"
      :text="news.text"
    />
  </div>
  <div class="home__feedback">
    <h2 class="text-4xl">{{ $t('feedback') }}</h2>
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
</script>