<template>
  <div class="sign-up">
    <div class="sign-up__content">
      <div class="sign-up__title">
        <h1>Sign up</h1>
      </div>
      <div class="sign-up__inputs">
        <input type="text" placeholder="Login">
        <input type="email" placeholder="Email">
        <input type="password" placeholder="Password">
      </div>
      <div class="sign-up__buttons">
        <button>Sign up</button>
        <span>or</span>
        <NuxtLink to="/auth/login">Login</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>