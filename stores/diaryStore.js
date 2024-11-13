import { defineStore } from 'pinia'

export const useDiaryStore = defineStore('diaryStore', {
  state: () => ({
    user: {},
    notes: [],
    selectedNote: {},
    isCreateNote: false
  }),
  actions: {
    setUser(user) {
      this.user = user
    },
    setNotes(notes) {
      this.notes = notes
    },
    setSelectedNote(note) {
      this.selectedNote = note
    },
    openCreateNote() {
      this.isCreateNote = true
    },
    closeCreateNote() {
      this.isCreateNote = false
    },
    addNewNote(note) {
      this.notes.push(note)
    }
  }
})