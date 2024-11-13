<template>
  <div class="change-note-modal">
    <div class="change-note-modal__window">
      <h2 class="text-4xl mt-5 text-center">
        Create new note
      </h2>
      <input 
        type="text" 
        placeholder="Note title"
        v-model="noteTitle"  
      > 
      <textarea 
        placeholder="Note"
        v-model="noteText"  
      ></textarea>
      <button 
        @click="editNote()"
      >Edit</button>
    </div>
    <div class="modal__overplay" @click="diaryStore.closeCreateNote()"></div>
  </div>
</template>

<script setup>
import { ref } from '#build/imports'
import DiaryApi from '~/api/diary'
import { useDiaryStore } from '../stores/diaryStore'

const diaryStore = useDiaryStore()

const props = defineProps({ 
  title: String, 
  text: String,
  noteId: String
})
const emitClose = defineEmits(['close'])

let noteTitle = ref(props.title)
let noteText = ref(props.text)

const editNote = () => {
  let form = ref({
    data: {
      title: noteTitle,
      text: noteText,
    }
  })
  DiaryApi.editNote(form.value, props.noteId)
  .then((response) => {
    diaryStore.editNote(props.noteId, response)
    emitClose('close', false)
  })
}
</script>