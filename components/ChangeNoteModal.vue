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
        @keydown.enter="editNote()"
      > 
      <textarea 
        placeholder="Note"
        v-model="noteText"  
        @keydown.enter="editNote()"        
      ></textarea>
      <button 
        @click="editNote()"
      >Edit</button>
    </div>
    <div class="modal__overplay"></div>
  </div>
</template>

<script setup>
import { ref } from '#build/imports'
import DiaryApi from '~/api/diary'
import { $notify } from '~/plugins/useNotify'
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
  if (noteTitle.value !== '' && noteText.value !== '') {
    DiaryApi.editNote(form.value, props.noteId)
    .then((response) => {
      diaryStore.editNote(props.noteId, response)
      emitClose('close', false)
    })
  } else {
    $notify('warning', 'All fields must be filled in')
  }
}
</script>