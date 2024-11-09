import ApiBase from "./base"
import { http } from '../composables/useFetch'
import { $notify } from "~/plugins/useNotify"

class AuthApi {
  static async register (form) {
    try {
      let url = ApiBase.baseApiUrl() + 'auth/local/register'
      let response = await http('post', url, form)
      console.log(response)
      $notify('success', 'You have been successfully registered')
      return response.data
    } catch(error) {
      throw error
    }
  }

  static async login (form) {

  }
}

export default AuthApi