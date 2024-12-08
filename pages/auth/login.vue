<template>
  <div class="login h-screen flex flex-col justify-center items-center text-center">
    <div class="login__content">
      <div class="login__title">
        <h1>{{ $t('login') }}</h1>
      </div>
      <div class="login__inputs">
        <input 
          type="text" 
          :placeholder="$t('login_placeholder')"
          v-model="form.identifier"  
          @keydown.enter="login(form)"
        >
        <div class="relative">
          <input 
            :type="passwordFieldType" 
            :placeholder="$t('password_placeholder')"
            v-model="form.password"  
            @keydown.enter="login(form)"
            class="login-password"
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
      <div class="login__buttons">
        <button 
          @click="login(form)"
          :disabled="isLoading"  
        >
          <span 
            class="button-text"
            v-if="!isLoading"  
          >
            {{ $t('login') }}
          </span>
          <NuxtImg 
            src="../public/images/spinner-solid.svg" 
            alt="loading" 
            class="animate-spin w-8 mx-auto"  
            v-else
          />
        </button>
        <span>{{ $t('or') }}</span>
        <NuxtLink to="/auth/sign-up">{{ $t('sign_up') }}</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ 
  middleware: 'auth'
})
import AuthApi from '../../api/auth'
import { useRouter } from 'vue-router'

const router = useRouter()

let form = ref({
  identifier: "",
  password: ""
})
let passwordFieldType = ref('password')
let isLoading = ref(false)

const login = (form) => {
  isLoading.value = true
  AuthApi.login(form)
  .then((response) => {
    router.push('/home')
    isLoading.value = false
  })
  .catch((error) => {
    isLoading.value = false
    if (error?.data?.error) {
      if (error?.data?.error?.details && Object.keys(error.data.error.details).length === 0) {
        $notify('error', error.data.error.message)
      } else {
        for (let i = 0; i < error.data.error.details.errors.length; i++) {
          $notify('error', error.data.error.details.errors[i].message)
        }
      }
    }
  })
}

function togglePasswordVisibility() {
  passwordFieldType.value = passwordFieldType.value === 'password' ? 'text' : 'password'
}
</script>