<template>
  <div :class="Object.keys(diaryStore.selectedNote).length === 0 ? 'sidebar pb-24' : 'sidebar_active pb-24'">
    <div class="sidebar-header">
      <NuxtImg 
        src="../public/images/right-from-bracket-solid.svg" 
        alt="logout"  
        @click="logout()"
      />
      <input 
        type="text" 
        :placeholder="homeStore.lang === 'en' ? 'Search by title' : 'Пошук за назвою'"
        v-model="searchInput"  
      >
    </div>
    <div class="sidebar__content">
      <h2 v-if="diaryStore.notes.length === 0 && homeStore.lang == 'en'">
        It's empty... for now. <br>
        <span>
          Start writing your 
          first thoughts and ideas!
        </span>
      </h2>
      <h2 v-else-if="diaryStore.notes.length === 0 && homeStore.lang === 'ua'">
        Він порожній... поки що. <br>
        <span>
          Почніть писати свої 
          перші думки та ідеї!
        </span>
      </h2>
      <div class="sidebar__notes" v-else>
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
      :componentText="homeStore.lang === 'en' ? 'Create new note' : 'Створити нову примітку'"
      :componentTextButton="homeStore.lang === 'en' ? 'Create' : 'Створити'"
      @close="(n) => isCreateNote = n"
    />
  </div>
</template>

<script setup>
import StorageHelper from '~/helpers/localStorageHelper'
import { useRouter } from 'vue-router'
import { useDiaryStore } from '../stores/diaryStore'
import { useHomeStore } from '../stores/homeStore'

const diaryStore = useDiaryStore()
const homeStore = useHomeStore()
const router = useRouter()
const route = useRoute()

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
  if (route.fullPath.slice(0, 3) === '/ua') {
    router.push('/ua/auth/login')
  } else {
    router.push('/en/auth/login')
  }
}
</script>