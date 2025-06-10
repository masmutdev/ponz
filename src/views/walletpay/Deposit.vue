<template>
  <div class="relative flex-1 rounded-lg bg-blue-500 dark:bg-blue-900 p-4 shadow-md h-full">
    <!-- Gambar kecil di pojok kanan atas -->
    <img
      src="@/assets/1/crypto-wallet.png"
      alt="Chart"
      class="absolute top-[-5px] right-2 h-20 w-20 opacity-50"
    />
    <p class="text-sm text-blue-200 font-semibold">Saldo</p>
    <p class="text-lg text-white font-bold">{{ formatUSD(saldoStore.saldo) }}</p>
  </div>
  <div
    class="max-w-md mx-auto mt-2 p-6 pt-2 bg-blue-100 dark:bg-gray-800 rounded-lg shadow-md space-y-4"
  >
    <h2 class="text-lg text-center font-bold text-gray-700 dark:text-white">Deposit</h2>

    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
      Nominal Deposit
    </label>
    <input
      type="number"
      v-model="nominal"
      placeholder="Masukkan nominal"
      class="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500 bg-white text-black dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
    />

    <div class="grid grid-cols-4 gap-2">
      <button
        v-for="amount in presets"
        :key="amount"
        @click="setNominal(amount)"
        class="bg-blue-300 text-blue-800 dark:bg-blue-900 dark:text-white px-2 py-1 rounded hover:bg-blue-200 dark:hover:bg-blue-800 text-sm font-medium"
      >
        ${{ amount }}
      </button>
    </div>

    <button
      class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 dark:bg-blue-900 dark:hover:bg-blue-800 transition"
      @click="submitDeposit"
    >
      Konfirmasi Deposit
    </button>
  </div>
  <div class="max-w-md mx-auto mt-4 p-4 bg-blue-100 dark:bg-gray-800 rounded-lg shadow space-y-3">
    <h3 class="text-md font-semibold text-gray-800 dark:text-white">Panduan Deposit</h3>
    <ol class="list-decimal list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
      <li v-for="(step, i) in panduan" :key="i">{{ step }}</li>
    </ol>
  </div>
  <Alerts :message="alertMessage" :show="showAlert" :type="alertType" @close="showAlert = false" />
</template>
<script setup>
import { ref } from 'vue'
import { onMounted } from 'vue'
import { useUserSaldo } from '@/stores/userSaldo'
import { useUserSimpanDeposit } from '@/stores/userSimpanDeposit'
import Alerts from '@/components/ui/walletpay/Alerts.vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const saldoStore = useUserSaldo()
const alertMessage = ref('')
const alertType = ref('success')
const showAlert = ref(false)

const showInfo = (msg, type = 'success') => {
  alertMessage.value = msg
  alertType.value = type
  showAlert.value = true
}

onMounted(() => {
  saldoStore.fetchSaldo()
})

const nominal = ref('')
const presets = [15, 30, 50, 100, 200, 500, 1000, 2000]

const setNominal = (amount) => {
  nominal.value = amount
}

const depositStore = useUserSimpanDeposit()

const submitDeposit = async () => {
  const jumlahUSD = Number(nominal.value)

  if (!jumlahUSD || jumlahUSD < 15) {
    alert('Minimal deposit adalah $15')
    return
  }

  await depositStore.simpan(jumlahUSD)

  if (depositStore.error) {
    showInfo(depositStore.error, 'error')
  } else {
    showInfo(depositStore.message)
    saldoStore.fetchSaldo()

    if (depositStore.invoice && depositStore.orderId) {
      setTimeout(() => {
        router.push({
          path: '/detail-deposit',
          query: {
            invoice: depositStore.invoice,
            order_id: depositStore.orderId,
          },
        })
      }, 3000)
    }
  }
}

const formatUSD = (angka) => {
  return `$${(angka / 16000).toFixed(2)}`
}

const panduan = [
  'Jumlah minimal deposit adalah: $15.00',
  'Jika mengalami masalah deposit yang tidak masuk, silakan hubungi customer service".',
]
</script>
