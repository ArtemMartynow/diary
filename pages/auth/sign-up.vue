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
        >
        <input
          type="email" 
          placeholder="Email"
          v-model="form.email"  
        >
        <input
          type="password" 
          placeholder="Password"
          v-model="form.password"  
        >
      </div>
      <div class="sign-up__buttons">
        <button @click="signUp(form)">Sign up</button>
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
import { $notify } from "~/plugins/useNotify"
import { useRouter } from 'vue-router'

const router = useRouter()

let form = ref({
  username: "",
	email: "",
  password: ""
})

const signUp = (form) => {
  AuthApi.register(form)
  .then((response) => {
    router.push('/auth/login')
  })
  .catch((error) => {
    if (Object.keys(error.data.error.details).length === 0) {
      $notify('error', error.data.error.message)
    } else {
      for (let i = 0; i < error.data.error.details.errors.length; i++) {
        $notify('error', error.data.error.details.errors[i].message)
      }
    }
  })
}
</script>