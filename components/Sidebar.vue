<template>
  <div class="sidebar pb-24">
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
          :data="note.date"
        />
      </div>
    </div>
    <button>
      <NuxtImg @click="addNote()" src="/images/xmark-solid.svg" alt="xmark" />
    </button>
  </div>
</template>

<script setup>
import { useDiaryStore } from '../stores/diaryStore'

const diaryStore = useDiaryStore()

const addNote = () => {
  diaryStore.openCreateNote()
}
</script>