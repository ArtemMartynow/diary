<template>
  <div :class="Object.keys(diaryStore.selectedNote).length === 0 ? 'home-page' : 'home-page_active'">
    <h1 v-if="Object.keys(diaryStore.selectedNote).length === 0">
      Не вибрано жодної примітки. Виберіть існуючу 
      нотатку або додайте нову, щоб продовжити.
    </h1>
    <div v-else class="home-page__content">
      <h2>{{ diaryStore.selectedNote.title }}</h2>
      <p>{{ diaryStore.selectedNote.text }}</p>
      <div class="flex justify-end">
        <div class="home-page__note-control flex justify-between mr-3">
          <NuxtImg 
            src="/images/trash-solid.svg" 
            alt="delete" 
            @click.stop="isDeleteNote = true"  
          />
          <NuxtImg 
            src="/images/pencil-solid.svg" 
            alt="delete" 
            @click.stop="isEditNote = true" 
          />
        </div>
        <span>{{ reverseDate(diaryStore.selectedNote.date) }}</span>
      </div>
      <NuxtImg 
        class="close-note" 
        src="/images/xmark-solid.svg" 
        alt="x" 
        @click="diaryStore.closeSelectedNote()"  
      />
    </div>
    <ConfirmationModal 
      v-if="isDeleteNote === true"
      title="Delete this note?"
      buttonText="Delete"
      @confirmAction="deleteNote(diaryStore.selectedNote.documentId)"
      @cancel="(n) => isDeleteNote = n"
    />
    <NoteCreatorEditorModal 
      v-if="isEditNote === true"
      :title="diaryStore.selectedNote.title"
      :text="diaryStore.selectedNote.text"
      :noteId="diaryStore.selectedNote.documentId"
      componentType="edit"
      componentText="Edit new note"
      componentTextButton="Edit"
      @close="(n) => isEditNote = n"
    />
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'diary',
  middleware: 'auth'
})
import DiaryApi from '~/api/diary'
import { reverseDate } from '~/helpers/customFunctions'
import { useDiaryStore } from '../stores/diaryStore'

const diaryStore = useDiaryStore()  

let isDeleteNote = ref(false)
let isEditNote = ref(false)

const deleteNote = (noteId) => {
  DiaryApi.deleteNote(noteId)
  .then(() => {
    diaryStore.deleteNote(noteId)
    diaryStore.closeSelectedNote()
    isDeleteNote = false
  })
}
</script>