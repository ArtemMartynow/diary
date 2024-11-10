import StorageHelper from '~/helpers/localStorageHelper' 

export default defineNuxtRouteMiddleware((to, from) => {
  if (process.server) return

  let token = StorageHelper.get('token')

  if (to.path === '/auth/login' || to.path === '/auth/sign-up' && token) { 
    return navigateTo('/home')
  }

  if (!token && to.path !== '/auth/login') { 
    return navigateTo('/auth/login')
  }

  if (!token && to.path === '/auth/login') { 
    return 
  } 
})