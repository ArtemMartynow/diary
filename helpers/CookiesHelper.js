import Cookies from 'js-cookie'

class CookiesHelper {
  static get(key) {
    const data = Cookies.get(key)

    try {
      return JSON.parse(data)
    } catch (e) {
      return data
    }
  }

  static set(key, data, options = {}) {
    data = typeof data === 'string' ? data : JSON.stringify(data)
    Cookies.set(key, data, options)
  }

  static remove(key) {
    Cookies.remove(key)
  }
}

export default CookiesHelper
