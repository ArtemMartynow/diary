<template>
  <div class="create-edit-note-modal">
    <div class="create-edit-note-modal__window">
      <h2 class="text-4xl mt-5 text-center">
        {{ componentText }}
      </h2>
      <input 
        type="text" 
        placeholder="Note title"
        v-model="noteTitle"  
        @keydown.enter="editNote()"
        @input="handleInput()"
      > 
      <textarea 
        placeholder="Note"
        v-model="noteText"  
        @keydown.enter="handleInput()"        
      ></textarea>
      <button 
        @click="handleSubmit()"
      >{{ componentTextButton }}</button>
    </div>
    <div class="modal__overplay" @click="$emit('close', false)"></div>
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
  noteId: String,
  componentType: String,
  componentText: String,
  componentTextButton: String
})

const emitClose = defineEmits(['close'])

let noteTitle = ref(props.title)
let noteText = ref(props.text)
let noteDate = new Date()

const handleInput = () => { 
  if (noteTitle.value.length > 40) { 
    noteTitle.value = noteTitle.value.slice(0, 40) 
    $notify('warning', 'Title can be at most 40 characters long') 
  } 
}

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
    emitClose('close', false)
  })
}

const handleNote = () => {
  if (props.componentType === 'edit') {
    editNote()
  } else if (props.componentType === 'create') {
    createNote()
  }
}

const handleSubmit = () => { 
  if (!noteTitle.value || !noteText.value) { 
    $notify('warning', 'All fields must be filled in')
    return 
  } 
  handleNote() 
}
</script>