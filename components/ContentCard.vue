<template>
  <div class="content-card w-full">
    <h2 class="text-3xl">{{ props.title }}</h2>
    <p>{{ props.text }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  text: String
})
</script>