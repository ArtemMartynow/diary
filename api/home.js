import ApiBase from "./base"

class HomeApi {
  static async getNews (query) {
    try {
      let url = ApiBase.baseApiUrl() + 'news'
      let response = await http('get', url, query)
      return response
    } catch(error) {
      throw error
    }
  }

  static async getFeedback () {
    try {
      let url = ApiBase.baseApiUrl() + 'feedbacks'
      let response = await http('get', url, null)
      return response
    } catch(error) {
      throw error
    }
  }
}

export default HomeApi