import ApiBase from "./base"
import StorageHelper from '~/helpers/localStorageHelper'
import { useDiaryStore } from '../stores/diaryStore'

class AuthApi {
  static async register (form) {
    try {
      let url = ApiBase.baseApiUrl() + 'users'
      let response = await http('post', url, form)
      $notify('success', 'You have been successfully registered')
      return response.data
    } catch(error) {
      throw error
    }
  }

  static async login (form) {
    try {
      if (!form.username || !form.password) {
        throw new Error('Username or password is missing')
      }
  
      let url = ApiBase.baseApiUrl() + `users?username=${form.username}&password=${form.password}`
      let response = await http('get', url, form)
      console.log(response);
      
      if (response.length != 1) { 
        throw new Error('Invalid username or password')  
      } 
  
      StorageHelper.set('token', response[0].id)
      $notify('success', 'You have been successfully signed in')
      const diaryStore = useDiaryStore()
      diaryStore.setUser(response[0])
      return response.data
    } catch(error) {
      $notify('error', error.message)
      throw error
    }
  }
  
}

export default AuthApi