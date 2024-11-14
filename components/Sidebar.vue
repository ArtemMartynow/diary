<template>
  <div class="sidebar pb-24">
    <div class="sidebar-header">
      <input 
        type="text" 
        placeholder="Search by title"
        v-model="searchInput"  
      >
    </div>
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
          v-for="note in newNotesList"
          :key="note.id"
          :title="note.title"
          :text="note.text"
          :data="note.date"
          :noteId="note.documentId"
          @click="diaryStore.setSelectedNote(note)"
        />
      </div>
    </div>
    <button>
      <NuxtImg @click="addNote()" src="/images/xmark-solid.svg" alt="xmark" />
    </button>
  </div>
</template>

<script setup>
import { ref } from '#build/imports';
import { useDiaryStore } from '../stores/diaryStore'

const diaryStore = useDiaryStore()

let searchInput = ref('')

const addNote = () => {
  diaryStore.openCreateNote()
}

let newNotesList = computed(() => {
  return diaryStore.notes.filter(
    (note) => note.title.indexOf(searchInput.value) !== -1)
})
</script>