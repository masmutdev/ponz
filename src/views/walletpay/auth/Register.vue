<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-transparent px-4">
    <form
      @submit.prevent="register"
      class="bg-black/50 shadow-md rounded-lg p-8 w-full max-w-sm space-y-4 my-4"
    >
      <h2 class="text-xl font-semibold text-center text-gray-100">Register</h2>

      <input
        v-model="nama"
        placeholder="Nama"
        class="w-full px-0 py-2 border-0 border-b border-white bg-transparent text-white placeholder-white focus:outline-none focus:ring-0 focus:border-blue-500"
      />
      <input
        v-model="email"
        placeholder="Email"
        type="email"
        class="w-full px-0 py-2 border-0 border-b border-white bg-transparent text-white placeholder-white focus:outline-none focus:ring-0 focus:border-blue-500"
      />
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
      <input
        v-model="retype"
        type="password"
        placeholder="Ulangi Password"
        class="w-full px-0 py-2 border-0 border-b border-white bg-transparent text-white placeholder-white focus:outline-none focus:ring-0 focus:border-blue-500"
      />

      <button
        type="submit"
        class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition"
      >
        Register
      </button>

      <Alerts :message="alertMessage" :show="showAlert" @close="showAlert = false" />
    </form>

    <div class="bg-black/50 shadow-md rounded-lg p-8 w-full max-w-sm space-y-4 mt-4">
      <h2 class="text-sm font-semibold text-center text-gray-100">
        Sudah punya akun? login disini
      </h2>

      <RouterLink
        to="/login"
        class="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition"
      >
        Login
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/lib/axios'
import Alerts from '@/components/ui/walletpay/Alerts.vue'

const router = useRouter()

const nama = ref('')
const email = ref('')
const hp = ref('')
const password = ref('')
const retype = ref('')

const showAlert = ref(false)
const alertMessage = ref('')

const showError = (msg: string) => {
  alertMessage.value = msg
  showAlert.value = true
}

const register = async () => {
  if (!nama.value || !email.value || !hp.value || !password.value || !retype.value) {
    return showError('Semua field wajib diisi')
  }

  if (password.value !== retype.value) {
    return showError('Password tidak cocok')
  }

  try {
    await api.post('/register/user', {
      nama: nama.value,
      email: email.value,
      hp: hp.value,
      password: password.value,
    })
    router.push('/login')
  } catch (err: any) {
    showError(err.response?.data?.message || 'Register gagal')
  }
}
</script>
