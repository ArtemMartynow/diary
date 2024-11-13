<template>
  <div class="sidebar__note">
    <span class="sidebar__note_title">{{ props.title }}</span>
    <p>{{ props.text }}</p>
    <span class="sidebar__note_date">{{ reverseDate(props.data) }}</span>
    <div class="sidebar__note-control">
      <NuxtImg 
        src="/images/trash-solid.svg" 
        alt="delete" 
        @click="isDeleteNote = true"  
      />
    </div>
    <ConfirmationModal 
      v-if="isDeleteNote === true"
      title="Delete this note?"
      buttonText="Delete"
      @confirmAction="deleteNote(props.noteId)"
      @cancel="(n) => isDeleteNote = n"
    />
  </div>
</template>

<script setup>
import { ref } from '#build/imports';
import { reverseDate } from '~/helpers/customFunctions'
import DiaryApi from '~/api/diary'
import { useDiaryStore } from '../stores/diaryStore'

const diaryStore = useDiaryStore()

const props = defineProps({ 
  title: String, 
  text: String,
  data: String,
  noteId: String
})

let isDeleteNote = ref(false)

const deleteNote = (noteId) => {
  DiaryApi.deleteNote(noteId)
  .then(() => {
    diaryStore.deleteNote(noteId)
  })
}
</script>