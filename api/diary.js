import ApiBase from "./base"
import { http } from '../composables/useFetch'
import { $notify } from "~/plugins/useNotify"

class DiaryApi {
  static async getProfile () {
    try {
      let url = ApiBase.baseApiUrl() + 'users/me'
      let response = await http('get', url, null, ApiBase.authHeaders())
      $notify('success', 'You have been successfully registered')
      return response.data
    } catch(error) {
      console.log(error);
      throw error
    }
  }
}

export default DiaryApi