export default defineNuxtRouteMiddleware((to) => {
  const token = useCookie('token').value

  if (!token) {
    if (['/', '/auth/login', '/auth/sign-up'].includes(to.path)) {
      return
    }
    if (to.path !== '/auth/login') {
      return navigateTo('/auth/login')
    }
  }

  if (token) {
    if (['/', '/home'].includes(to.path)) {
      return
    }
    if (to.path !== '/') {
      return navigateTo('/home')
    }
  }
})