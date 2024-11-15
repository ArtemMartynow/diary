<template>
  <div class="confirmation-modal">
    <div class="confirmation-modal__window text-white">
      <h2 class="text-2xl mt-5 mb-9">{{ title }}</h2>
      <button 
        @click="confirmAction"
        class="confirmation-modal__delete"
      >{{ buttonText }}</button>
      <button 
        @click="$emit('cancel', false)"
        class="confirmation-modal__cancel"  
      >Cancel</button>
    </div>
    <div class="modal__overplay"></div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  buttonText: {
    type: String,
    required: true
  },
})

const emitAction = defineEmits(['cancel', 'confirmAction'])

const confirmAction = () => {
  emitAction('confirmAction', confirmAction)
}
</script>