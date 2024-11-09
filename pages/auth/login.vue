<template>
  <div class="login">
    <div class="login__content">
      <div class="login__title">
        <h1>Login</h1>
      </div>
      <div class="login__inputs">
        <input 
          type="text" 
          placeholder="Login"
          v-model="form.identifier"  
          @keydown.enter="login(form)"
        >
        <input 
          type="password" 
          placeholder="Password"
          v-model="form.password"  
          @keydown.enter="login(form)"
        >
      </div>
      <div class="login__buttons">
        <button @click="login(form)">Login</button>
        <span>or</span>
        <NuxtLink to="/auth/sign-up">Sign up</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import AuthApi from '../../api/auth'
import { ref } from '#build/imports'
import { $notify } from "~/plugins/useNotify"
import { useRouter } from 'vue-router'

const router = useRouter()

let form = ref({
  identifier: "",
  password: ""
})

const login = (form) => {
  AuthApi.login(form)
  .then((response) => {
    router.push('/home')
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