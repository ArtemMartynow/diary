import CookiesHelper from '~/helpers/CookiesHelper'

class ApiBase {
  static baseApiUrl () {
		return import.meta.env.VITE_API_URL
	}

	static authHeaders() {
    let headers = {}
    if (CookiesHelper.get('token')) {
      headers.Authorization = 'Bearer ' + CookiesHelper.get('token')
    }
    return { ...headers }
  }
}

export default ApiBase
