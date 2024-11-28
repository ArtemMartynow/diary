<template>
  <div class="app-language absolute right-5 bottom-5">
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

const currentLangClass = computed(() => {
  return locale.value === 'en' ? 'diary-layout' : 'diary-layout ua';
})

const switchTo = (lang) => {
  locale.value = lang;
}
</script>