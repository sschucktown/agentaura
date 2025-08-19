
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute, RouterLink } from 'vue-router'
import { useAuth } from '../composables/useAuth'
const { signIn } = useAuth()
const email = ref('')
const password = ref('')
const msg = ref('')
const router = useRouter()
const route = useRoute()
async function submit(){
  msg.value = ''
  const { error } = await signIn(email.value, password.value)
  if (error) msg.value = error.message
  else router.push((route.query.next as string) || '/')
}
</script>

<template>
  <div class="max-w-md mx-auto card">
    <h1 class="text-xl font-bold mb-2">Log in</h1>
    <form @submit.prevent="submit" class="space-y-3">
      <input v-model="email" class="w-full border border-slate-800 bg-slate-900 rounded p-2" placeholder="Email" />
      <input v-model="password" type="password" class="w-full border border-slate-800 bg-slate-900 rounded p-2" placeholder="Password" />
      <button class="px-3 py-2 bg-indigo-600 text-white rounded">Sign in</button>
      <div v-if="msg" class="text-red-400 text-sm">{{ msg }}</div>
    </form>
    <div class="text-sm mt-3">No account? <RouterLink to="/signup" class="underline">Sign up</RouterLink></div>
  </div>
</template>
