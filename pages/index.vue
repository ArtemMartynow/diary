<template>
<div class="home">
  <h1>Welcome to your personal diary!</h1>
  <p>
    Record your thoughts, ideas and memories. 
    Sign up to create your first diary or log 
    in to continue with your existing notes. 
    Manage your notes, edit and save important 
    moments in one place!
  </p>
  <div class="home__links">
    <NuxtLink to="/auth/login">Log in</NuxtLink>
    <NuxtLink to="/auth/sign-up">Sign up</NuxtLink>
  </div>
  <div class="home__news">
    <h2 class="text-4xl">News</h2>
    <ContentCard 
      v-for="news in homeStore.news"
      :key="news.id"
      :title="news.title"
      :text="news.text"
    />
  </div>
</div>
</template>

<script setup>
import { useHomeStore } from '../stores/homeStore'

const homeStore = useHomeStore()
</script>