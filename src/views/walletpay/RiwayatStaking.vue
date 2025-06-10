<template>
  <div class="max-w-2xl mx-auto mt-2 p-4 space-y-4">
    <h2 class="text-lg font-bold text-center text-blue-800 dark:text-blue-400">Riwayat Staking</h2>

    <div v-if="store.loading" class="text-center text-sm text-gray-500">Memuat...</div>
    <div v-else-if="store.error" class="text-center text-sm text-red-500">{{ store.error }}</div>

    <div
      v-for="item in store.data"
      :key="item.id"
      class="p-4 rounded-lg shadow bg-white dark:bg-gray-800 text-sm space-y-2"
    >
      <div class="border-b border-gray-200 pb-2 mb-2">
        <div class="flex flex-row justify-between">
          <div class="flex flex-row justify-start items-center">
            <img
              :src="getImgSrc(item.kode_produk)"
              :alt="item.nama_produk"
              class="w-10 h-10 object-cover rounded-lg shadow-md"
            />
            <div class="flex flex-col justify-start items-start ml-3 mb-3">
              <p class="text-lg font-semibold text-blue-800 dark:text-blue-400">
                {{ item.nama_produk }}
              </p>
              <p class="text-[10px] text-gray-600 dark:text-gray-300 text-center">
                {{ item.created_at }}
              </p>
            </div>
          </div>
          <div class="flex flex-col justify-start items-center">
            <p class="font-semibold text-blue-800 dark:text-blue-400">Income Per Day</p>
            <p class="font-semibold text-blue-800 dark:text-blue-400">
              ${{ item.profit_perhari.toLocaleString() }}
            </p>
          </div>
        </div>
      </div>

      <div
        class="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full my-4 overflow-hidden relative"
      >
        <div
          class="h-full bg-blue-500 dark:bg-blue-400 relative overflow-hidden"
          :style="{ width: `${getProgressToMidnight()}%` }"
        >
          <div
            v-if="Number(item.status) === 0"
            class="absolute top-0 left-0 h-full w-full shimmer"
          ></div>
        </div>

        <div
          v-if="Number(item.status) === 0"
          class="absolute inset-0 flex items-center justify-center text-[10px] font-semibold text-white z-10"
        >
          {{ countdowns[item.id] }}
        </div>
      </div>

      <div class="flex justify-between items-center">
        <p class="text-xs text-gray-600 dark:text-gray-300 text-center">Status :</p>
        <span
          class="px-3 py-1 rounded-full text-xs font-medium"
          :class="getStatusClass(Number(item.status))"
        >
          {{ getStatusText(Number(item.status)) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRiwayatStaking } from '@/stores/userRiwayatStaking'

const store = useRiwayatStaking()
const countdowns = ref({})

import usdt from '@/assets/1/usdt.png'
import btc from '@/assets/1/btc.png'
import eth from '@/assets/1/eth.png'
import sol from '@/assets/1/sol.png'
import doge from '@/assets/1/doge.png'
import fallback from '@/assets/1/doge.png'

const coinImages = {
  usdt,
  btc,
  eth,
  sol,
  doge,
}

const getImgSrc = (kode) => {
  return coinImages[kode.toLowerCase()] || fallback
}

const getCountdownForItem = (item) => {
  if (Number(item.status) !== 0) return ''

  const now = new Date()
  const target = new Date()
  target.setHours(23, 59, 59, 999)

  const diff = target - now
  if (diff <= 0) return '00:00:00'

  const hours = Math.floor(diff / 1000 / 60 / 60)
  const minutes = Math.floor((diff / 1000 / 60) % 60)
  const seconds = Math.floor((diff / 1000) % 60)

  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

const updateCountdowns = () => {
  const updated = {}
  for (const item of store.data) {
    updated[item.id] = getCountdownForItem(item)
  }
  countdowns.value = updated
}

onMounted(async () => {
  await store.fetchRiwayat()
  updateCountdowns()
  setInterval(updateCountdowns, 1000)
})

const getProgressToMidnight = () => {
  const now = new Date()
  const totalSecondsInDay = 24 * 60 * 60

  const secondsPassed = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds()

  const progress = (secondsPassed / totalSecondsInDay) * 100
  return Math.floor(progress)
}

const getStatusText = (status) => {
  const val = Number(status)
  return val === 0 ? 'Berjalan' : val === 1 ? 'Selesai' : 'Gagal'
}

const getStatusClass = (status) => {
  const val = Number(status)
  return {
    'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300': val === 0,
    'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300': val === 1,
    'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300': val === 2,
  }
}
</script>

<style scoped>
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
    opacity: 0.2;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    transform: translateX(100%);
    opacity: 0.2;
  }
}

.shimmer {
  background: linear-gradient(
    to right,
    transparent 0%,
    rgba(255, 255, 255, 0.5) 50%,
    transparent 100%
  );
  animation: shimmer 1.5s infinite;
}
</style>
