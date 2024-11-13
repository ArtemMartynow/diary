<template>
  <div class="sidebar__note">
    <span class="sidebar__note_title">{{ props.title }}</span>
    <p>{{ props.text }}</p>
    <span class="sidebar__note_date">{{ props.data }}</span>
  </div>
</template>

<script setup>
const props = defineProps({ 
  title: String, 
  text: String,
  data: String
})
</script>