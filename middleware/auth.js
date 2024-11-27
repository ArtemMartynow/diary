import StorageHelper from '~/helpers/localStorageHelper' 

export default defineNuxtRouteMiddleware((to, from) => {
  if (process.server) return

  let token = StorageHelper.get('token')
  let lang = to.path.slice(0,3)

  if (!token && to.path === `${lang}/home`) {
    return navigateTo(`${lang}/auth/login`)
  }

  if (token && to.path !== `${lang}/home`) {
    return navigateTo(`${lang}/home`)
  }
})