
import { ref, onMounted } from 'vue'
import { supabase } from '../services/supabase'

const userRef = ref<any | null>(null)
const loading = ref(true)

export function useAuth(){
  async function init(){
    const { data: { session } } = await supabase.auth.getSession()
    userRef.value = session?.user ?? null
    loading.value = false
  }
  onMounted(() => {
    if (loading.value) init()
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      userRef.value = session?.user ?? null
    })
  })
  const signIn = (email: string, password: string) => supabase.auth.signInWithPassword({ email, password })
  const signUp = (email: string, password: string) => supabase.auth.signUp({ email, password })
  const signOut = () => supabase.auth.signOut()

  return { user: userRef, loading, signIn, signUp, signOut }
}
