<template>
  <div class="sidebar__note text-left releative" @click="diaryStore.setSelectedNote(props.note)">
    <span class="sidebar__note_title">{{ shortenText(props.note.title, 22) }}</span>
    <p>{{ shortenText(props.note.text, 30) }}</p>
    <span class="sidebar__note_date">{{ reverseDate(props.note.date) }}</span>
  </div>
</template>

<script setup>
import { reverseDate, shortenText } from '~/helpers/customFunctions'
import { useDiaryStore } from '../stores/diaryStore'

const diaryStore = useDiaryStore()

const props = defineProps({ 
  note: Object
})

</script>