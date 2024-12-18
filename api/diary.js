import ApiBase from "./base"
import { useDiaryStore } from '../stores/diaryStore'
import StorageHelper from "~/helpers/localStorageHelper"

class DiaryApi {

  static async getProfile () {
    try {
      let url = ApiBase.baseApiUrl() + `users/${StorageHelper.get('token')}`
      let response = await http('get', url, null, ApiBase.authHeaders())
      const diaryStore = useDiaryStore() 

      diaryStore.setUser(response)
      return response.data
    } catch(error) {
      throw error
    }
  }

  static async getNotes () {
    try {
      const diaryStore = useDiaryStore() 
      let url = ApiBase.baseApiUrl() + `notes?userId=${StorageHelper.get('token')}`
      let response = await http('get', url, null, ApiBase.authHeaders())

      diaryStore.setNotes(response)
      return response.data
    } catch(error) {
      throw error
    }
  }

  static async addNote (form) {
    try {
      let url = ApiBase.baseApiUrl() + 'notes'
      let response = await http('post', url, form, ApiBase.authHeaders())
      const diaryStore = useDiaryStore() 

      diaryStore.addNewNote(response)
      $notify('success', 'You have created a new note')
      return response.data
    } catch(error) {
      throw error
    }
  }

  static async deleteNote (noteId) {
    try {
      let url = ApiBase.baseApiUrl() + `notes/${noteId}`
      let response = await http('delete', url, null, ApiBase.authHeaders())

      $notify('success', 'You deleted the note')
      return response
    } catch(error) {
      throw error
    }
  }
  
  static async editNote (form, noteId) {
    try {
      let url = ApiBase.baseApiUrl() + `notes/${noteId}`
      let response = await http('patch', url, form, ApiBase.authHeaders())
      const diaryStore = useDiaryStore() 

      diaryStore.setSelectedNote(response)
      diaryStore.editNote(noteId, response)
      $notify('success', 'You changed the note')
      return response.data
    } catch(error) {
      throw error
    }
  }
}

export default DiaryApi