<template>
  <div class="max-w-2xl mx-auto mt-2 p-4 space-y-4">
    <h2 class="text-lg font-bold text-center text-blue-800 dark:text-blue-400">Riwayat Staking</h2>

    <div
      v-for="item in dataStaking"
      :key="item.id"
      class="p-4 rounded-lg shadow bg-white dark:bg-gray-800 text-sm space-y-2"
    >
      <div class="flex justify-between items-center">
        <p class="font-semibold text-blue-800 dark:text-blue-400">Staking</p>
        <p class="font-semibold text-blue-800 dark:text-blue-400">Rp. {{ item.nominal }}</p>
      </div>
      <p class="text-xs text-gray-600 dark:text-gray-300 text-center">
        {{ item.created_at }}
      </p>

      <p class="text-gray-500 dark:text-gray-400 text-center">
        {{ getKeterangan(item.status) }}
      </p>

      <div class="flex justify-center">
        <span
          class="px-3 py-1 rounded-full text-xs font-medium"
          :class="getStatusClass(item.status)"
        >
          {{ item.status }}
        </span>
      </div>
    </div>
  </div>
</template>
<script setup>
const dataStaking = [
  { id: 1, nominal: 500000, created_at: '2025-06-01 09:00', status: 'Berjalan' },
  { id: 2, nominal: 200000, created_at: '2025-05-20 10:30', status: 'Selesai' },
  { id: 3, nominal: 150000, created_at: '2025-05-10 08:15', status: 'Gagal' },
]

const getKeterangan = (status) => {
  if (status === 'Berjalan') return 'Staking masih berjalan'
  if (status === 'Selesai') return 'Staking telah selesai'
  if (status === 'Gagal') return 'Staking dibatalkan/gagal'
  return '-'
}

const getStatusClass = (status) => {
  return {
    'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300': status === 'Berjalan',
    'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300': status === 'Selesai',
    'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300': status === 'Gagal',
  }
}
</script>
