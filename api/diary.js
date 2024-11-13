import ApiBase from "./base"
import { http } from '../composables/useFetch'
import { useDiaryStore } from '../stores/diaryStore'

class DiaryApi {
  static async getProfile () {
    try {
      let url = ApiBase.baseApiUrl() + 'users/me'
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
      let url = ApiBase.baseApiUrl() + `notes?filters[userId][$eq]=${diaryStore.user.id}`
      let response = await http('get', url, null, ApiBase.authHeaders())

      diaryStore.setNotes(response.data)
      return response.data
    } catch(error) {
      throw error
    }
  }
}

export default DiaryApi