<template>
  <div :class="currentLangClass">
    <slot />
    <LanguageSwitcher />
  </div>
</template>

<script setup>
const { locale } = useI18n()

const currentLangClass = computed(() => {
  let langClass = 'h-screen flex items-center justify-center'
  return locale.value === 'en' ? langClass : `${langClass} ua`
})
</script>