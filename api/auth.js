import ApiBase from "./base"
import { http } from '../composables/useFetch'
import { $notify } from "~/plugins/useNotify"
import StorageHelper from '~/helpers/localStorageHelper'
import { useDiaryStore } from '../stores/diaryStore' 

class AuthApi {
  static async register (form) {
    try {
      let url = ApiBase.baseApiUrl() + 'auth/local/register'
      let response = await http('post', url, form)
      $notify('success', 'You have been successfully registered')
      return response.data
    } catch(error) {
      throw error
    }
  }

  static async login (form) {
    try {
      let url = ApiBase.baseApiUrl() + 'auth/local'
      let response = await http('post', url, form)
      const diaryStore = useDiaryStore()

      StorageHelper.set('token', response.jwt)
      diaryStore.setUser(response.user)
      $notify('success', 'You have been successfully signed in')
      console.log(response);
      return response.data
    } catch(error) {
      throw error
    }
  }
}

export default AuthApi