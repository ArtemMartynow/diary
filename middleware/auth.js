import StorageHelper from '~/helpers/localStorageHelper' 

export default defineNuxtRouteMiddleware((to, from) => {
  if (process.server) return

  let token = StorageHelper.get('token')

  if (!token && to.path === '/en/home') {
    return navigateTo('/en/auth/login')
  }

  if (token && to.path !== '/en/home') {
    return navigateTo('/en/home')
  }
})