import StorageHelper from '~/helpers/localStorageHelper'

class ApiBase {
  static baseApiUrl () {
		return import.meta.env.VITE_API_URL
	}

	static authHeaders() {
    let headers = {}
    if (StorageHelper.get('token')) {
      headers.Authorization = 'Bearer ' + StorageHelper.get('token')
    }
    return { ...headers }
  }
}

export default ApiBase
