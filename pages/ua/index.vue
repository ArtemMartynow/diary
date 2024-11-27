<template>
<div class="home">
  <h1>Ласкаво просимо до вашого особистого щоденника!</h1>
  <p>
    Записуйте свої думки, ідеї та спогади. 
    Зареєструйтеся, щоб створити свій перший щоденник, або увійдіть 
    увійти, щоб продовжити вже існуючі нотатки. 
    Керуйте своїми нотатками, редагуйте та зберігайте важливі 
    моменти в одному місці!
  </p>
  <div class="home__links home__links_ua">
    <NuxtLink to="ua/auth/login" class="w-64 py-10">Увійти</NuxtLink>
    <NuxtLink to="ua/auth/sign-up" class="w-64 py-10">Зареєструватися</NuxtLink>
  </div>
  <div class="home__news">
    <h2 class="text-4xl">Новини</h2>
    <ContentCard 
      v-for="news in homeStore.news"
      :key="news.id"
      :title="news.title"
      :text="news.text"
    />
  </div>
  <div class="home__feedback">
    <h2 class="text-4xl">Відгуки</h2>
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