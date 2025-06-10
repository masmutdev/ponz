<template>
  <div class="max-w-md mx-auto space-y-4">
    <div v-if="!notFound" class="max-w-md mx-auto space-y-4">
      <!-- Invoice Box -->
      <div class="p-4 bg-blue-100 dark:bg-gray-800 rounded-lg shadow-md text-center space-y-1">
        <div class="flex justify-between items-center">
          <h2 class="text-lg font-bold text-gray-700 dark:text-white">Detail Invoice</h2>
          <p class="text-sm italic text-gray-700 dark:text-white">
            #{{ detailStore.data.invoice }}
          </p>
        </div>

        <p class="text-sm text-gray-700 dark:text-gray-400">
          {{ new Date(detailStore.data.created_at).toLocaleString('id-ID') }}
        </p>
        <div v-if="!detailStore.data.bukti" class="text-center">
          <p class="text-xl text-center font-mono text-blue-600 dark:text-blue-300">
            {{ countdown }}
          </p>
        </div>
      </div>

      <!-- Status Box -->
      <div
        class="p-4 bg-white dark:bg-gray-900 rounded-lg shadow-md flex flex-col items-center space-y-3"
      >
        <div class="flex items-center justify-center gap-2">
          <span
            class="flex flex-row justify-center text-sm font-bold px-2 py-1 rounded-full"
            :class="{
              'bg-green-100 text-green-800': statusLabel === 'Lunas',
              'bg-red-100 text-red-800': statusLabel === 'Failed',
              'bg-yellow-100 text-yellow-800':
                statusLabel === 'Pending' || statusLabel === 'Expired',
            }"
          >
            <component
              :is="statusIcon"
              class="w-5 h-5"
              :class="{
                'text-green-600': statusLabel === 'Lunas',
                'text-red-600': statusLabel === 'Failed',
                'text-yellow-600': statusLabel === 'Pending' || statusLabel === 'Expired',
              }"
            />
            <p class="ml-3">Pembayaran {{ statusLabel }}</p>
          </span>
        </div>

        <p class="text-lg my-4 font-bold text-gray-800 dark:text-white">
          Rp. {{ nominalFinal.toLocaleString('id-ID') }}
        </p>

        <img src="@/assets/1/bri.png" alt="Bank Logo" class="h-10" />
        <p class="text-sm font-medium text-gray-800 dark:text-white">
          Rek: <span class="font-bold">7680786784</span>
        </p>
        <p class="text-sm font-medium text-gray-800 dark:text-white">
          Nama: <span class="font-bold">MATHANE</span>
        </p>
      </div>

      <!-- Upload Bukti Pembayaran -->
      <div class="w-full">
        <label
          v-if="!detailStore.data.bukti"
          class="flex items-center justify-center gap-2 w-full py-2 px-4 border-2 border-dashed border-blue-400 rounded-md cursor-pointer hover:bg-blue-50 dark:hover:bg-gray-700 text-blue-600 dark:text-blue-300"
        >
          <IconUpload class="w-5 h-5" />
          <span class="text-sm font-medium">Upload Bukti Pembayaran</span>
          <input type="file" class="hidden" accept="image/*" @change="handleFileUpload" />
        </label>

        <div class="flex items-center justify-center">
          <span
            v-if="detailStore.data.bukti"
            class="text-sm font-medium text-center text-gray-800 dark:text-white"
            >Bukti Pembayaran</span
          >
        </div>

        <div v-if="previewUrl || detailStore.data.bukti" class="mt-4 text-center">
          <img
            :src="previewUrl || 'https://ziyuanpanel.cloud/' + detailStore.data.bukti"
            alt="Preview Bukti Pembayaran"
            class="w-full h-auto rounded shadow"
          />
        </div>
      </div>

      <div v-if="!detailStore.data.bukti" class="mt-4 text-center">
        <button
          class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed transition"
          :disabled="!previewUrl"
          @click="kirimBukti"
        >
          Kirim Bukti Pembayaran
        </button>
      </div>

      <div
        class="p-4 border border-dashed rounded-md"
        :class="{
          'bg-yellow-500/30 border-yellow-500': statusLabel !== 'Lunas',
          'bg-green-500/20 border-green-500': statusLabel === 'Lunas',
        }"
      >
        <h2
          class="text-sm text-center font-bold flex items-start gap-2"
          :class="{
            'text-yellow-800 dark:text-yellow-200': statusLabel !== 'Lunas',
            'text-green-800 dark:text-green-200': statusLabel === 'Lunas',
          }"
        >
          <span v-if="statusLabel === 'Lunas'">
            ✅ Pembayaran anda telah dikonfirmasi admin. Terima kasih.
          </span>
          <span v-else-if="detailStore.data.bukti">
            ⏳ Tunggu konfirmasi admin maksimal 1 jam kerja. Terima kasih.
          </span>
          <span v-else>
            ℹ️ Silahkan lakukan transfer sebesar
            <strong>Rp. {{ nominalFinal.toLocaleString('id-ID') }}</strong>
            ke nomor rekening di atas. Jika sudah, kirimkan screenshoot bukti transfer dan tunggu
            konfirmasi admin maksimal 1 jam kerja.
          </span>
        </h2>
      </div>
    </div>
    <div
      v-else
      class="max-w-md mx-auto mt-10 p-6 bg-red-100 dark:bg-red-800 text-center rounded-lg shadow"
    >
      <h2 class="text-lg font-bold text-red-700 dark:text-red-200">❌ Invoice Tidak Valid</h2>
      <p class="text-sm text-red-600 dark:text-red-100 mt-2">
        Silakan periksa kembali link atau hubungi admin jika kamu merasa ini kesalahan.
      </p>
    </div>
  </div>
  <Alerts :message="alertMessage" :show="showAlert" :type="alertType" @close="showAlert = false" />
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useUserDetailDeposit } from '@/stores/userDetailDeposit'
import { useUserKirimBukti } from '@/stores/userKirimBukti'

import { IconCheck, IconX, IconClock, IconAlertTriangle, IconUpload } from '@tabler/icons-vue'
import Alerts from '@/components/ui/walletpay/Alerts.vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const alertMessage = ref('')
const alertType = ref('success')
const showAlert = ref(false)

const showInfo = (msg, type = 'success') => {
  alertMessage.value = msg
  alertType.value = type
  showAlert.value = true
}

const buktiFile = ref(null)
const kirimBuktiStore = useUserKirimBukti()

// router & store
const route = useRoute()
const detailStore = useUserDetailDeposit()
const notFound = ref(false)

// ambil query params
const invoice = String(route.query.invoice || '')
const order_id = String(route.query.order_id || '')

// countdown
const countdown = ref('00:00:00')
let intervalId

const statusLabel = computed(() => detailStore.statusLabel)
const statusIcon = computed(() => {
  switch (statusLabel.value) {
    case 'Lunas':
      return IconCheck
    case 'Pending':
      return IconClock
    case 'Expired':
      return IconAlertTriangle
    default:
      return IconX
  }
})

// parsing tanggal dan exp
const createdAt = computed(() => new Date(detailStore.data.created_at))
const expiredAt = computed(() => new Date(createdAt.value.getTime() + 24 * 60 * 60 * 1000))

const updateCountdown = () => {
  const now = Date.now()
  const diff = expiredAt.value.getTime() - now
  if (diff <= 0) {
    countdown.value = '00:00:00'
    clearInterval(intervalId)
    return
  }
  const h = Math.floor(diff / 3.6e6)
  const m = Math.floor((diff % 3.6e6) / 6e4)
  const s = Math.floor((diff % 6e4) / 1000)
  countdown.value = [h, m, s].map((x) => String(x).padStart(2, '0')).join(':')
}

const previewUrl = ref(null)

const handleFileUpload = (e) => {
  const file = e.target?.files?.[0]
  if (file) {
    previewUrl.value = URL.createObjectURL(file)
    buktiFile.value = file
  }
}

const nominalFinal = computed(() => {
  const base = Math.round(detailStore.data.jumlah * 16000)
  const unik = Number(detailStore.data.kode_unik) || 0
  return base + unik
})

const kirimBukti = async () => {
  if (!buktiFile.value) return showInfo('File bukti belum dipilih', 'error')

  await kirimBuktiStore.kirim({
    file: buktiFile.value,
    invoice,
    order_id,
  })

  if (kirimBuktiStore.error) {
    showInfo(kirimBuktiStore.error, 'error')
  } else {
    showInfo(kirimBuktiStore.message, 'success')
    await detailStore.fetchDetail(invoice, order_id)
  }
}

// fetch data on mount
onMounted(async () => {
  if (invoice && order_id) {
    await detailStore.fetchDetail(invoice, order_id)

    if (detailStore.error === 'Data deposit tidak ditemukan') {
      notFound.value = true
      return
    }

    updateCountdown()
    intervalId = window.setInterval(updateCountdown, 1000)
  }
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>
