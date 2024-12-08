<template>
  <div class="app-language absolute right-5 bottom-5 flex items-center justify-between">
    <span 
      :class="locale === 'en' ? 'lang-active' : ''"
      @click="switchTo('en')"  
    >en</span>
    <span 
      :class="locale === 'ua' ? 'lang-active' : ''"
      @click="switchTo('ua')"  
    >ua</span>
  </div>  
</template>

<script setup>
const { locale } = useI18n()

const switchTo = (lang) => {
  locale.value = lang;
}
</script>