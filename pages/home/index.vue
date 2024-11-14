<template>
  <div :class="Object.keys(diaryStore.selectedNote).length === 0 ? 'home-page' : 'home-page_active'">
    <h1 v-if="Object.keys(diaryStore.selectedNote).length === 0">
      There is no note selected. Select an existing 
      note or add a new one to continue.
    </h1>
    <div v-else class="home-page__content">
      <h2>{{ diaryStore.selectedNote.title }}</h2>
      <p>{{ diaryStore.selectedNote.text }}</p>
      <span>{{ reverseDate(diaryStore.selectedNote.date) }}</span>
      <NuxtImg 
        class="close-note" 
        src="/images/xmark-solid.svg" 
        alt="x" 
        @click="diaryStore.closeSelectedNote()"  
      />
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'diary',
  middleware: 'auth'
})
import { reverseDate } from '~/helpers/customFunctions'
import { useDiaryStore } from '../stores/diaryStore'

const diaryStore = useDiaryStore()  
</script>