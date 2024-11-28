import { defineStore } from 'pinia'

export const useHomeStore = defineStore('homeStore', {
  state: () => ({
    news: [],
    feedback: [],
  }),
  actions: {
    getNews(news) {
      this.news = news
    },
    getFeedback(feedback) {
      this.feedback = feedback
    },
  }
})