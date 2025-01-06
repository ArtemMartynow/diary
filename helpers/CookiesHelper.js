class CookiesHelper {
  static get(key) {
    const cookie = useCookie(key)

    try {
      return JSON.parse(cookie.value)
    } catch (e) {
      return cookie.value
    }
  }

  static set(key, data, options = {}) {
    const cookie = useCookie(key, options);
    cookie.value = typeof data === 'string' ? data : JSON.stringify(data);
  }

  static remove(key) {
    const cookie = useCookie(key)
    cookie.value = null
  }
}

export default CookiesHelper