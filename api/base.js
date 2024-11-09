class ApiBase {
  static baseApiUrl () {
		return import.meta.env.VITE_API_URL
	}
}

export default ApiBase
