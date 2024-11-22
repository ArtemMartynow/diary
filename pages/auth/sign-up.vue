<template>
  <div class="sign-up">
    <div class="sign-up__content">
      <div class="sign-up__title">
        <h1>Sign up</h1>
      </div>
      <div class="sign-up__inputs">
        <input
          type="text" 
          placeholder="Login"
          v-model="form.username"  
          @keydown.enter="signUp(form)"
        >
        <input
          type="email" 
          placeholder="Email"
          v-model="form.email"  
          @keydown.enter="signUp(form)"
        >
        <div class="relative">
          <input
            :type="passwordFieldType"
            placeholder="Password"
            v-model="form.password"  
            @keydown.enter="signUp(form)"
            class="sign-up-password"
          >
          <NuxtImg 
            src="/images/eye-regular.svg" 
            alt="show"  
            @click="togglePasswordVisibility"
            class="absolute right-3.5 top-3 w-6 cursor-pointer"
            v-if="passwordFieldType === 'password'"
          />
          <NuxtImg 
            src="/images/eye-slash-regular.svg" 
            alt="hide"  
            @click="togglePasswordVisibility"
            class="absolute right-3 top-3 w-7 cursor-pointer"
            v-else
          />
        </div>
      </div>
      <div class="sign-up__buttons">
        <button 
          @click="signUp(form)"
          :disabled="isLoading"  
        >
          <span 
            class="button-text"
            v-if="isLoading === false"  
          >
            Sign up
          </span>
          <NuxtImg 
            src="../public/images/spinner-solid.svg" 
            alt="loading" 
            class="animate-spin w-8 mx-auto"  
            v-else
          />
        </button>
        <span>or</span>
        <NuxtLink to="/auth/login">Login</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ 
  middleware: 'auth'
})

import AuthApi from '../../api/auth'
import { ref } from '#build/imports'
import { $notify } from '~/plugins/useNotify'
import { useRouter } from 'vue-router'

const router = useRouter()

let form = ref({
  username: "",
	email: "",
  password: ""
})
let passwordFieldType = ref('password')
let isLoading = ref(false)

const signUp = (form) => {
  isLoading.value = true
  AuthApi.register(form)
  .then((response) => {
    router.push('/auth/login')
    isLoading.value = false
  })
  .catch((error) => {
    isLoading.value = false
    if (Object.keys(error.data.error.details).length === 0) {
      $notify('error', error.data.error.message)
    } else {
      for (let i = 0; i < error.data.error.details.errors.length; i++) {
        $notify('error', error.data.error.details.errors[i].message)
      }
    }
  })
}

function togglePasswordVisibility() {
  passwordFieldType.value = passwordFieldType.value === 'password' ? 'text' : 'password'
}
</script>