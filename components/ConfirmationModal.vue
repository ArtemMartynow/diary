<template>
  <div class="confirmation-modal fixed top-0 left-0 w-full h-full flex items-center justify-center">
    <div class="confirmation-modal__window text-white relative text-center">
      <h2 class="text-2xl mt-5 mb-9">{{ title }}</h2>
      <button 
        @click="confirmAction"
        class="confirmation-modal__delete w-full font-medium left-0 bg-none"
      >{{ buttonText }}</button>
      <button 
        @click="$emit('cancel', false)"
        class="confirmation-modal__cancel w-full font-medium left-0 bottom-0 bg-none"  
      >{{ $t('cancel') }}</button>
    </div>
    <div class="modal__overplay absolute top-0 left-0 w-full h-full bg-black z-0"></div>
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