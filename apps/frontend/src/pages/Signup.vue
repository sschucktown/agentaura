
<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useAuth } from '../composables/useAuth'
const { signUp } = useAuth()
const email = ref('')
const password = ref('')
const msg = ref('')
async function submit(){
  msg.value = ''
  const { error } = await signUp(email.value, password.value)
  if (error) msg.value = error.message
  else msg.value = 'Check your email to confirm your account.'
}
</script>

<template>
  <div class="max-w-md mx-auto card">
    <h1 class="text-xl font-bold mb-2">Create account</h1>
    <form @submit.prevent="submit" class="space-y-3">
      <input v-model="email" class="w-full border border-slate-800 bg-slate-900 rounded p-2" placeholder="Email" />
      <input v-model="password" type="password" class="w-full border border-slate-800 bg-slate-900 rounded p-2" placeholder="Password (min 6 chars)" />
      <button class="px-3 py-2 bg-indigo-600 text-white rounded">Sign up</button>
      <div v-if="msg" class="text-slate-300 text-sm">{{ msg }}</div>
    </form>
    <div class="text-sm mt-3">Have an account? <RouterLink to="/login" class="underline">Log in</RouterLink></div>
  </div>
</template>
