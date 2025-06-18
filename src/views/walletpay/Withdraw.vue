<template>
  <div class="relative flex-1 rounded-lg bg-blue-500 dark:bg-blue-900 p-4 shadow-md h-full">
    <img
      src="@/assets/1/crypto-wallet.png"
      alt="Chart"
      class="absolute top-[-5px] right-2 h-20 w-20 opacity-50"
    />
    <p class="text-sm text-blue-200 font-semibold">Saldo</p>
    <p class="text-lg text-white font-bold">{{ formatUSD(saldoStore.saldo) }}</p>
  </div>

  <div class="max-w-md mx-auto mt-2 bg-blue-100 dark:bg-gray-800 rounded-lg shadow space-y-3">
    <button
      @click="showBankInfo = !showBankInfo"
      class="w-full flex justify-between items-center p-4 text-sm font-semibold text-gray-800 dark:text-white"
    >
      <span>Data Bank Penarikan</span>
      <span class="transition-transform duration-300" :class="showBankInfo ? 'rotate-90' : ''">
        <IconChevronRight class="w-5 h-5" />
      </span>
    </button>

    <div v-if="showBankInfo" class="px-4 pb-4 space-y-3 relative">
      <router-link
        to="/data-penarikan"
        class="absolute top-0 right-4 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
      >
        Edit Informasi Penarikan
      </router-link>

      <div class="space-y-2 pt-4">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nama Bank</label>
        <input
          type="text"
          v-model="bank"
          class="w-full p-2 border rounded-md bg-white text-black dark:bg-gray-800 dark:text-white"
          disabled
        />
      </div>

      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >Nama Pemilik Rekening</label
        >
        <input
          type="text"
          v-model="pemilik"
          class="w-full p-2 border rounded-md bg-white text-black dark:bg-gray-800 dark:text-white"
          disabled
        />
      </div>

      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >Nomor Rekening</label
        >
        <input
          type="text"
          v-model="rekening"
          class="w-full p-2 border rounded-md bg-white text-black dark:bg-gray-800 dark:text-white"
          disabled
        />
      </div>
    </div>
  </div>

  <div
    class="max-w-md mx-auto mt-2 p-6 pt-2 bg-blue-100 dark:bg-gray-800 rounded-lg shadow-md space-y-4"
  >
    <h2 class="text-lg text-center font-bold text-gray-700 dark:text-white">Penarikan</h2>

    <div class="space-y-2">
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >Jumlah Penarikan</label
      >
      <input
        type="number"
        v-model="jumlah"
        placeholder="Masukkan jumlah"
        class="w-full p-2 border rounded-md bg-white text-black dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-500"
      />
    </div>

    <button
      class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 dark:bg-blue-900 dark:hover:bg-blue-800 transition"
      @click="submitWithdraw"
    >
      Konfirmasi Penarikan
    </button>
  </div>
  <div class="max-w-md mx-auto mt-4 p-4 bg-blue-100 dark:bg-gray-800 rounded-lg shadow space-y-4">
    <h3 class="text-md font-semibold text-gray-800 dark:text-white">Informasi Penarikan Dana</h3>

    <!-- Peraturan umum -->
    <ol class="list-decimal list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
      <li v-for="(rule, i) in peraturan" :key="i">{{ rule }}</li>
    </ol>

    <!-- Jadwal penarikan -->
    <div class="pt-2 space-y-1 text-sm text-gray-700 dark:text-gray-300">
      <p>🗓 <strong>Jadwal Penarikan:</strong></p>
      <p>
        Penarikan hanya dapat dilakukan pada hari <strong>Senin hingga Jumat</strong> (hari kerja).
      </p>
      <p>
        ❌
        <span class="text-red-600 dark:text-red-400">Hari Sabtu, Minggu, dan Hari Libur:</span>
        Tidak ada penarikan.
      </p>
    </div>

    <!-- Estimasi waktu -->
    <div class="pt-2 space-y-1 text-sm text-gray-700 dark:text-gray-300">
      <p>⏳ <strong>Estimasi Waktu Proses:</strong></p>
      <ul class="list-disc list-inside ml-4">
        <li>Paling cepat: 1×24 jam</li>
        <li>Paling lambat: 2×24 jam</li>
      </ul>
    </div>

    <!-- Contoh -->
    <div class="pt-2 text-sm text-gray-700 dark:text-gray-300">
      <p>🔍 <strong>Contoh Waktu Proses:</strong></p>
      <p>
        Jika Anda melakukan penarikan pada hari Senin, dana akan diterima selambat-lambatnya pada
        hari Rabu sesuai jam penarikan.<br />
        Jika diproses cepat, dana akan masuk pada hari Selasa.
      </p>
    </div>

    <!-- Catatan -->
    <div class="pt-2 text-sm text-yellow-700 dark:text-yellow-300">
      <p>⚠️ <strong>Catatan Penting:</strong></p>
      <p>Pastikan data penarikan Anda sudah benar dan lengkap agar proses berjalan lancar.</p>
    </div>
  </div>
  <Alerts :message="alertMessage" :show="showAlert" :type="alertType" @close="showAlert = false" />
</template>

<script setup>
import { IconChevronRight, IconChevronDown } from '@tabler/icons-vue'
import { useUserSaldo } from '@/stores/userSaldo'
import { ref, onMounted } from 'vue'
import { useUserDataRekening } from '@/stores/userDataRekening'
import { useUserSimpanWithdraw } from '@/stores/userSimpanWithdraw'
import Alerts from '@/components/ui/walletpay/Alerts.vue'

const alertMessage = ref('')
const alertType = ref('success')
const showAlert = ref(false)

const showInfo = (msg, type = 'success') => {
  alertMessage.value = msg
  alertType.value = type
  showAlert.value = true
}

const jumlah = ref(null)
const withdrawStore = useUserSimpanWithdraw()

const submitWithdraw = async () => {
  if (!jumlah.value || isNaN(jumlah.value) || jumlah.value < 1) {
    alert('Jumlah withdraw tidak valid')
    return
  }

  await withdrawStore.simpan(jumlah.value)

  if (withdrawStore.error) {
    showInfo(withdrawStore.error, 'error')
  } else {
    showInfo(withdrawStore.success)
  }
}

const rekeningStore = useUserDataRekening()
const bank = ref('')
const pemilik = ref('')
const rekening = ref('')

const showBankInfo = ref(true)

onMounted(async () => {
  await rekeningStore.fetchRekening()
  const data = rekeningStore.data
  bank.value = data.bank
  pemilik.value = data.pemilik
  rekening.value = data.norek
})

const saldoStore = useUserSaldo()

onMounted(() => {
  saldoStore.fetchSaldo()
})

const peraturan = [
  'Minimal Penarikan: $5.00 (setara dengan Rp 80.000)',
  'Biaya Penarikan E-wallet: 0% dari total penarikan',
  'Biaya Penarikan Bank: 5% dari total penarikan',
]

const formatUSD = (angka) => {
  return `$${(angka / 16000).toFixed(2)}`
}
</script>
