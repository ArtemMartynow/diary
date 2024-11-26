import { defineStore } from 'pinia'

export const useHomeStore = defineStore('homeStore', {
  state: () => ({
    news: [],
    feedback: [],
    lang: 'en'
  }),
  actions: {
    getNews(news) {
      this.news = news
    },
    getFeedback(feedback) {
      this.feedback = feedback
    },
    changeLangEn() {
      this.lang = 'en'
    },
    changeLangUa() {
      this.lang = 'ua'
    }
  }
})