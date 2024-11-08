<template>
  <div class="login">
    <div class="login__content">
      <div class="login__title">
        <h1>Login</h1>
      </div>
      <div class="login__inputs">
        <input type="text" placeholder="Login">
        <input type="password" placeholder="Password">
      </div>
      <div class="login__buttons">
        <button>Login</button>
        <span>or</span>
        <NuxtLink to="/auth/sign-up">Sign up</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>