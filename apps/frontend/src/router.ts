
import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from './composables/useAuth'

const routes = [
  { path: '/', name: 'dashboard', component: () => import('./pages/Dashboard.vue'), meta: { requiresAuth: true } },
  { path: '/pricing', name: 'pricing', component: () => import('./pages/Pricing.vue'), meta: { requiresAuth: true } },
  { path: '/login', name: 'login', component: () => import('./pages/Login.vue') },
  { path: '/signup', name: 'signup', component: () => import('./pages/Signup.vue') },
]

const router = createRouter({ history: createWebHistory(), routes })

router.beforeEach((to) => {
  const { user } = useAuth()
  if (to.meta.requiresAuth && !user.value) {
    return { name: 'login', query: { next: to.fullPath } }
  }
})

export default router
