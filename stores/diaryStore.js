import { defineStore } from 'pinia'

export const useDiaryStore = defineStore('diaryStore', {
  state: () => ({
    user: {},
    notes: [],
    selectedNote: {}
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
    }
  }
})