
<template>
  <div class="min-h-screen">
    <header class="border-b border-slate-800 bg-slate-900/50">
      <div class="max-w-5xl mx-auto p-3 flex items-center justify-between">
        <RouterLink to="/" class="font-extrabold">Agent Aura</RouterLink>
        <nav class="flex items-center gap-2">
          <RouterLink class="btn" to="/pricing">Pricing</RouterLink>
          <template v-if="user">
            <button class="btn" @click="logout">Sign out</button>
          </template>
          <template v-else>
            <RouterLink class="btn" to="/login">Log in</RouterLink>
            <RouterLink class="btn btn-primary" to="/signup">Sign up</RouterLink>
          </template>
        </nav>
      </div>
    </header>
    <main class="max-w-5xl mx-auto p-4">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
import { useAuth } from './composables/useAuth'
const { user, signOut } = useAuth()
function logout(){ signOut() }
</script>
