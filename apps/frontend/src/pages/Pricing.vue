
<script setup lang="ts">
import { ref } from 'vue'
const loading = ref(false)
async function checkout(plan:string){
  loading.value = true
  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/billing/create-checkout-session`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priceId: plan })
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Failed')
    window.location.href = data.sessionUrl
  } catch (e:any) {
    alert(e.message)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="max-w-3xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">Choose your plan</h1>
    <div class="grid md:grid-cols-3 gap-4">
      <div class="card">
        <div class="font-bold">Starter</div>
        <div class="text-3xl">$29<span class="text-base">/mo</span></div>
        <button :disabled="loading" @click="checkout('starter')" class="mt-2 px-3 py-2 bg-indigo-600 text-white rounded">Get Starter</button>
      </div>
      <div class="card">
        <div class="font-bold">Pro</div>
        <div class="text-3xl">$49<span class="text-base">/mo</span></div>
        <button :disabled="loading" @click="checkout('pro')" class="mt-2 px-3 py-2 bg-indigo-600 text-white rounded">Get Pro</button>
      </div>
      <div class="card">
        <div class="font-bold">Team</div>
        <div class="text-3xl">$99<span class="text-base">/mo</span></div>
        <button :disabled="loading" @click="checkout('team')" class="mt-2 px-3 py-2 bg-indigo-600 text-white rounded">Get Team</button>
      </div>
    </div>
  </div>
</template>
