import { defineNuxtPlugin } from '#app' 
import Notifications from '@kyvg/vue3-notification' 
import { useNotification } from '@kyvg/vue3-notification'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Notifications) 
})

export const $notify = (type, response) => {
  const { notify } = useNotification()
  notify({ type: type, text: response, duration: 5000 })
}