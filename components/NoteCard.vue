<template>
  <div class="sidebar__note">
    <span class="sidebar__note_title">{{ shortenText(props.title, 22) }}</span>
    <p>{{ shortenText(props.text, 30) }}</p>
    <span class="sidebar__note_date">{{ reverseDate(props.data) }}</span>
    <div class="sidebar__note-control flex justify-between">
      <NuxtImg 
        src="/images/pencil-solid.svg" 
        alt="delete" 
        @click="isEditNote = true" 
      />
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
    <ChangeNoteModal 
      v-if="isEditNote === true"
      :title="props.title"
      :text="props.text"
      :noteId="props.noteId"
      @close="(n) => isEditNote = n"
    />
  </div>
</template>

<script setup>
import { ref } from '#build/imports';
import { reverseDate, shortenText } from '~/helpers/customFunctions'
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
let isEditNote = ref(false)

const deleteNote = (noteId) => {
  DiaryApi.deleteNote(noteId)
  .then(() => {
    diaryStore.deleteNote(noteId)
  })
}
</script>