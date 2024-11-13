import StorageHelper from '~/helpers/localStorageHelper' 

export default defineNuxtRouteMiddleware((to, from) => {
  if (process.server) return

  let token = StorageHelper.get('token')

  if (!token && to.path === '/home') {
    return navigateTo('auth/login')
  }

  if (token && to.path !== '/home') {
    return navigateTo('/home')
  }
})