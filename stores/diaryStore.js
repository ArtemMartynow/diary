import { defineStore } from 'pinia'

export const useDiaryStore = defineStore('diaryStore', {
  state: () => ({
    user: {},
    notes: [],
    selectedNote: {},
    isCreateNote: false,
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
    closeSelectedNote() {
      this.selectedNote = {}
    },
    openCreateNote() {
      this.isCreateNote = true
    },
    closeCreateNote() {
      this.isCreateNote = false
    },
    addNewNote(note) {
      this.notes.push(note)
    },
    deleteNote(noteId) {
      this.notes = this.notes.filter((note) => note.id !== noteId)
    },
    editNote(noteId, changedNote) {
      this.notes = this.notes.map((note) => {
        if (note.id === noteId) {
          return { ...note, ...changedNote }
        }
        return note
      })
    },
  }
})