import ApiBase from '@/api/base'

export function http (method, url, params, header) {
  method = method.toLowerCase()
  const config = {
    method: method,
    headers: { 'Content-Type': 'application/json', ...header, },
  }
  
  if (method === 'get') {
    config.params = params
  } else if (method === 'post' || method === 'put' || method === 'delete' || method === 'patch') {
    config.body = JSON.stringify(params)
  }

  config.headers = Object.assign(header || {})

  return new Promise((resolve, reject) => {
    return $fetch(url, config)
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        if (error.response) {
          switch (error.response.status) {
            case 400:
              reject(error)
              break
            case 401:
              ApiBase.unAuthorizeUser()
              reject(error)
              break
            case 404:
              reject({
                ...error.response.data
              })
              break
            case 422:
              reject({
                ...error.response.data,
              })
              break
            case 500:
              reject(error)
              break
            default:
              reject(error)
              break
          }
        } else {
          console.error(error)
          reject(error)
        }
      })
  })
}
