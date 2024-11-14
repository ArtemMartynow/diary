<template>
  <div 
    class="create-note-modal" 
    v-if="diaryStore.isCreateNote === true"
  >
    <div class="create-note-modal__window">
      <h2 class="text-4xl mt-5 text-center">
        Create new note
      </h2>
      <input 
        type="text" 
        placeholder="Note title"
        v-model="noteTitle"  
        @input="handleInput"
      > 
      <textarea 
        placeholder="Note"
        v-model="noteText"  
      ></textarea>
      <button 
        @click="handleSubmit()"
      >Create</button>
    </div>
    <div class="modal__overplay" @click="diaryStore.closeCreateNote()"></div>
  </div>
</template>

<script setup>
import { ref } from '#build/imports'
import { $notify } from '~/plugins/useNotify'
import DiaryApi from '~/api/diary'
import { useDiaryStore } from '../stores/diaryStore'

const diaryStore = useDiaryStore()

let noteTitle = ref('')
let noteText = ref('')
let noteDate = new Date()

const handleInput = () => { 
  if (noteTitle.value.length > 40) { 
    noteTitle.value = noteTitle.value.slice(0, 40) 
    $notify('warning', 'Title can be at most 40 characters long') 
  } 
}

const createNote = () => {
  let userId = ref(diaryStore.user?.id)
  let form = ref({
    data: {
      title: noteTitle,
      text: noteText,
      userId: userId,
      date: noteDate
    }
  })
  DiaryApi.addNote(form.value)
  .then((response) => {
    diaryStore.addNewNote(response)
    diaryStore.closeCreateNote()
    noteTitle.value = ''
    noteText.value = ''
  })
}

const handleSubmit = () => { 
  if (!noteTitle.value || !noteText.value) { 
    $notify('warning', 'All fields must be filled in')
    return 
  } 
  createNote() 
}
</script>