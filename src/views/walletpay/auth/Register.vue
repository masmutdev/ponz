<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-transparent px-4">
    <img src="@/assets/1/auth-logo.png" alt="Auth Logo" class="w-70 mb-6 my-4" />
    <form
      @submit.prevent="register"
      class="bg-black/50 shadow-md rounded-lg p-8 w-full max-w-sm space-y-4"
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
      <input
        v-model="uplineReff"
        placeholder="Kode Referral"
        class="w-full px-0 py-2 border-0 border-b border-white bg-transparent text-white placeholder-white focus:outline-none focus:ring-0 focus:border-blue-500"
      />
      <div class="flex items-center justify-between">
        <canvas ref="captchaCanvas" width="150" height="50" class="rounded bg-white" />
        <button type="button" @click="generateCaptcha" class="text-sm text-blue-300 underline ml-2">
          Refresh
        </button>
      </div>
      <input
        v-model="captchaInput"
        placeholder="Masukkan captcha di atas"
        class="w-full px-0 py-2 border-0 border-b border-white bg-transparent text-white placeholder-white focus:outline-none focus:ring-0 focus:border-blue-500"
      />

      <button
        type="submit"
        class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition"
      >
        Register
      </button>

      <Alerts
        :message="alertMessage"
        :show="showAlert"
        :type="alertType"
        @close="showAlert = false"
      />
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
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import api from '@/lib/axios'
import Alerts from '@/components/ui/walletpay/Alerts.vue'

const router = useRouter()
const route = useRoute()

const nama = ref('')
const email = ref('')
const hp = ref('')
const password = ref('')
const retype = ref('')
const uplineReff = ref('')

const showAlert = ref(false)
const alertMessage = ref('')
const alertType = ref<'success' | 'error'>('error')

const captchaCode = ref('')
const captchaInput = ref('')

// Generate captcha baru
const captchaCanvas = ref<HTMLCanvasElement | null>(null)

const generateCaptcha = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = ''
  for (let i = 0; i < 5; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  captchaCode.value = code

  const canvas = captchaCanvas.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // Background
  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Noise lines
  for (let i = 0; i < 5; i++) {
    ctx.strokeStyle = `rgba(0,0,0,${Math.random()})`
    ctx.beginPath()
    ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height)
    ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height)
    ctx.stroke()
  }

  // Draw captcha text
  ctx.font = 'bold 26px monospace'
  ctx.fillStyle = '#333'
  for (let i = 0; i < code.length; i++) {
    const angle = (Math.random() - 0.5) * 0.5
    ctx.save()
    ctx.translate(25 + i * 25, 35)
    ctx.rotate(angle)
    ctx.fillText(code[i], 0, 0)
    ctx.restore()
  }
}

onMounted(() => {
  const kodeReff = route.query.reff as string
  if (kodeReff) uplineReff.value = kodeReff
  generateCaptcha()
})

onMounted(() => {
  const kodeReff = route.query.reff as string
  if (kodeReff) uplineReff.value = kodeReff
})

const showNotif = (msg: string, type: 'success' | 'error' = 'error') => {
  alertMessage.value = msg
  alertType.value = type
  showAlert.value = true
}

const register = async () => {
  if (captchaInput.value.trim().toUpperCase() !== captchaCode.value) {
    return showNotif('Captcha salah')
  }

  if (!nama.value || !email.value || !hp.value || !password.value || !retype.value) {
    return showNotif('Semua field wajib diisi')
  }

  if (password.value !== retype.value) {
    return showNotif('Password tidak cocok')
  }

  const hpPattern = /^(628|08)\d{9,11}$/
  if (!hpPattern.test(hp.value)) {
    return showNotif('Nomor HP tidak valid')
  }

  try {
    await api.post('/register/user', {
      nama: nama.value,
      email: email.value,
      hp: hp.value,
      password: password.value,
      upline_reff: uplineReff.value,
    })

    showNotif('Register berhasil, silakan login', 'success')
    setTimeout(() => {
      router.push({ path: '/login' })
    }, 1000)
  } catch (err: any) {
    const apiMsg = err.response?.data?.error || err.response?.data?.message || 'Register gagal'

    if (apiMsg.includes('upline reff')) {
      showNotif('Kode Referral tidak boleh kosong')
    } else {
      showNotif(apiMsg, 'error')
    }
  }
}
</script>
