<template>
  <div class="sidebar">
    <span>Diary</span>
    <div class="sidebar__content">
      <h2 v-if="diaryStore.notes.length === 0">
        It's empty... for now. <br>
        <span>
          Start writing your 
          first thoughts and ideas!
        </span>
      </h2>
      <div class="sidebar__notes" v-else>
        <NoteCard 
          v-for="note in diaryStore.notes"
          :key="note.id"
          :title="note.title"
          :text="note.text"
          :data="note.data"
        />
      </div>
    </div>
    <button>
      <NuxtImg src="/images/xmark-solid.svg" alt="xmark" />
    </button>
  </div>
</template>

<script setup>
import { useDiaryStore } from '../stores/diaryStore'

const diaryStore = useDiaryStore()
</script>