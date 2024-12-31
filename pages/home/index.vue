<template>
  <div :class="Object.keys(diaryStore.selectedNote).length === 0 ? 'home-page' : 'home-page_active'">
    <h1 v-if="Object.keys(diaryStore.selectedNote).length === 0">
      {{ $t('note_not_selected') }}
    </h1>
    <div v-else class="home-page__content flex flex-col justify-between h-full w-full text-left relative">
      <h2>{{ diaryStore.selectedNote.title }}</h2>
      <p>{{ diaryStore.selectedNote.text }}</p>
      <div class="flex justify-end">
        <div class="home-page__note-control flex justify-between mr-3">
          <NuxtImg 
            src="/images/trash-solid.svg" 
            alt="delete" 
            @click.stop="showDeleteModal()"  
          />
          <NuxtImg 
            src="/images/pencil-solid.svg" 
            alt="delete" 
            @click.stop="showEditModal()" 
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
      :title="$t('delete_title')"
      :buttonText="$t('delete')"
      @confirmAction="deleteNote(diaryStore.selectedNote.id)"
      @cancel="closeDeleteModal()"
    />
    <NoteCreatorEditorModal 
      v-if="isEditNote === true"
      :title="diaryStore.selectedNote.title"
      :text="diaryStore.selectedNote.text"
      :noteId="diaryStore.selectedNote.id"
      componentType="edit"
      :componentText="$t('edit_note')"
      :componentTextButton="$t('edit')"
      @close="closeEditModal()"
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

const diaryStore = useDiaryStore()  

let isDeleteNote = ref(false)
let isEditNote = ref(false)

const showDeleteModal = () => { 
  isDeleteNote.value = true 
} 
const closeDeleteModal = () => { 
  isDeleteNote.value = false 
} 
const showEditModal = () => { 
  isEditNote.value = true 
} 
const closeEditModal = () => { 
  isEditNote.value = false 
}

const closeNote = () => { 
  diaryStore.closeSelectedNote() 
  isDeleteNote.value = false 
  isEditNote.value = false 
}

const deleteNote = (noteId) => {
  DiaryApi.deleteNote(noteId)
  .then(() => {
    console.log(noteId);
    diaryStore.deleteNote(noteId)
    closeNote()
  })
}
</script>