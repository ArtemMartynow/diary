<template>
  <div class="content-card w-full">
    <h2 class="text-3xl">{{ props.title }}</h2>
    <p>{{ props.text }}</p>
    <div class="content-card__info flex justify-between mt-3 mb-2 p-2" v-if="props.author || props.date">
      <div class="content-card__author">
        <span class="mr-3">{{ reverseDate(props.date) }}</span>
        <span>{{ props.author }}</span>
      </div>
      <div class="content-card__tags">
        <span 
          v-for="tag in props.tags" 
          :key="tag"
          class="ml-2 p-3 bg-purple-500 rounded-full"  
        >{{ '#' + tag }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reverseDate } from '~/helpers/customFunctions'

const props = defineProps({
  title: String,
  text: String,
  date: String,
  author: String,
  tags: Array
})

</script>