import ApiBase from "./base"

class HomeApi {
  static async getNews () {
    try {
      let url = ApiBase.baseApiUrl() + 'news'
      let response = await http('get', url, null)
      console.log(response)
      return response.data
    } catch(error) {
      throw error
    }
  }

}

export default HomeApi