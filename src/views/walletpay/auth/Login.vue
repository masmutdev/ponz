<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-transparent px-4">
    <form
      @submit.prevent="login"
      class="bg-black/50 shadow-md rounded-lg p-8 w-full max-w-sm space-y-4"
    >
      <h2 class="text-xl font-semibold text-center text-gray-100">Login</h2>
      <input
        v-model="hp"
        placeholder="No HP"
        class="w-full px-0 py-2 border-0 border-b border-white bg-transparent text-white placeholder-white focus:outline-none focus:ring-0 focus:border-blue-500"
      />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        class="w-full px-0 py-2 border-0 border-b border-white bg-transparent text-white placeholder-white focus:outline-none focus:ring-0 focus:border-blue-500"
      />

      <button
        type="submit"
        class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition"
      >
        Login
      </button>

      <Alerts :message="alertMessage" :show="showAlert" @close="showAlert = false" />
    </form>
    <div class="bg-black/50 shadow-md rounded-lg p-8 w-full max-w-sm space-y-4 mt-4">
      <h2 class="text-sm font-semibold text-center text-gray-100">
        Belum punya akun ? daftar disini
      </h2>

      <RouterLink
        to="/register"
        class="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition"
      >
        Register
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/lib/axios'
import Alerts from '@/components/ui/walletpay/Alerts.vue'

const showAlert = ref(false)
const alertMessage = ref('')

const showError = (msg: string) => {
  alertMessage.value = msg
  showAlert.value = true
}
const hp = ref('')
const password = ref('')
const router = useRouter()

const login = async () => {
  try {
    const res = await api.post('/login/user', { hp: hp.value, password: password.value })
    localStorage.setItem('token', res.data.token)
    router.push('/')
  } catch (err: any) {
    showError(err.response?.data?.message || 'Login gagal')
  }
}
</script>
