<template>
  <div class="max-w-2xl mx-auto mt-2 p-4 space-y-4">
    <h2 class="text-lg font-bold text-center text-blue-800 dark:text-blue-400">
      Riwayat Bonus dan Profit
    </h2>

    <div v-if="bonusStore.loading" class="text-center text-gray-500">Memuat data...</div>
    <div v-else-if="bonus.length === 0" class="text-center text-gray-500">
      Belum ada riwayat bonus.
    </div>

    <div
      v-else
      v-for="(item, i) in bonus"
      :key="i"
      class="p-4 rounded-lg shadow bg-white dark:bg-gray-800 text-sm space-y-2"
    >
      <div class="flex justify-between items-center">
        <p class="font-semibold text-blue-800 dark:text-blue-400">{{ item.kategori_bonus }}</p>
        <p class="font-semibold text-green-700 dark:text-green-300">
          {{ formatUSD(item.jumlah_bonus) }}
        </p>
      </div>
      <p class="text-xs text-gray-600 dark:text-gray-300 text-center">
        {{ item.created_at }}
      </p>
      <p
        v-if="item.kategori_bonus !== 'Bonus Deposit'"
        class="text-gray-500 dark:text-gray-400 text-center"
      >
        Kode: {{ item.kode_bonus }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useUserRiwayatBonus } from '@/stores/userRiwayatBonus'

const bonusStore = useUserRiwayatBonus()

onMounted(() => {
  bonusStore.fetchRiwayatBonus()
})

const bonus = computed(() => bonusStore.data)

const formatUSD = (angka) => {
  return `$${(angka / 16000).toFixed(2)}`
}
</script>
