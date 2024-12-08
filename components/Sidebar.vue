<template>
  <div :class="Object.keys(diaryStore.selectedNote).length === 0 ? 'sidebar pb-24 text-center flex flex-col justify-between h-screen relative' : 'sidebar_active pb-24 text-center flex flex-col justify-between h-screen relative'">
    <div class="sidebar-header flex justify-between items-center shrink-0">
      <NuxtImg 
        src="../public/images/right-from-bracket-solid.svg" 
        alt="logout"  
        @click="logout()"
      />
      <input 
        type="text" 
        :placeholder="$t('search_placeholder')"
        v-model="searchInput"  
      >
    </div>
    <div class="sidebar__content">
      <h2 v-if="diaryStore.notes.length === 0">
        {{ $t('notes_are_empty') }} <br>
        <span>
          {{ $t('start_writing') }}
        </span>
      </h2>
      <div class="sidebar__notes">
        <NoteCard 
          v-for="note in newNotesList"
          :key="note.id"
          :note="note"
        />
      </div>
    </div>
    <button>
      <NuxtImg @click="isCreateNote = true" src="/images/xmark-solid.svg" alt="xmark" />
    </button>
    <NoteCreatorEditorModal 
      v-if="isCreateNote === true"
      componentType="create"
      :componentText="$t('create_note')"
      :componentTextButton="$t('create')"
      @close="(n) => isCreateNote = n"
    />
  </div>
</template>

<script setup>
import StorageHelper from '~/helpers/localStorageHelper'
import { useDiaryStore } from '../stores/diaryStore'

const diaryStore = useDiaryStore()
const router = useRouter()

let searchInput = ref('')
let isCreateNote = ref(false)

let newNotesList = computed(() => {
  return diaryStore.notes.filter(
    (note) => note.title.indexOf(searchInput.value) !== -1
  )
})

const logout = () => {
  $notify('success', 'You log out')
  StorageHelper.remove('token')
  router.push('/auth/login')
}
</script>