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
      class="flex items-center justify-between bg-white dark:bg-gray-800 p-3 rounded-lg shadow"
    >
      <!-- Kiri: Icon & Detail -->
      <div class="flex items-start gap-2">
        <img :src="getIcon(formatKategori(item.kategori_bonus))" alt="icon" class="w-6 h-6 mt-1" />
        <div>
          <p
            class="text-sm font-bold"
            :class="{
              'text-red-500': item.kategori_bonus.toLowerCase().includes('prosessing'),
              'text-green-600':
                item.kategori_bonus.toLowerCase().includes('sukses') ||
                item.kategori_bonus.toLowerCase().includes('deposit'),
              'text-blue-600': true,
            }"
          >
            {{ item.kategori_bonus }}
          </p>
          <p class="text-xs text-gray-500 dark:text-gray-400">
            {{ formatTanggal(item.created_at) }}
          </p>
        </div>
      </div>

      <!-- Kanan: Jumlah -->
      <p class="text-green-600 font-bold text-sm">
        {{ formatUSD(item.jumlah_bonus) }}
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

const formatKategori = (text) => {
  if (!text) return ''
  if (text.includes('Rabat Profit Level 1')) return 'Benefit Rebate 1'
  if (text.includes('Rabat Profit Level 2')) return 'Benefit Rebate 2'
  if (text.includes('Rabat Profit Level 3')) return 'Benefit Rebate 3'
  if (text.includes('Profit Investasi') || text.includes('Profit Staking')) return 'Benefit Harian'
  return text
}

const bonus = computed(() => bonusStore.data)

const formatUSD = (angka) => {
  return `$${(angka / 16000).toFixed(2)}`
}

const formatTanggal = (tanggal) => {
  const d = new Date(tanggal)
  return d.toLocaleString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

// Icon selector
const getIcon = (kategori) => {
  const lower = kategori.toLowerCase()
  if (lower.includes('sukses')) return 'https://cdn-icons-png.flaticon.com/512/5610/5610944.png'
  if (lower.includes('prosessing')) return 'https://cdn-icons-png.flaticon.com/512/5610/5610924.png'
  if (lower.includes('sponsor')) return 'https://cdn-icons-png.flaticon.com/512/865/865808.png'
  if (lower.includes('harian')) return 'https://cdn-icons-png.flaticon.com/512/2603/2603312.png'
  if (lower.includes('rabate')) return 'https://cdn-icons-png.flaticon.com/512/2603/2603367.png'
  return 'https://cdn-icons-png.flaticon.com/512/5610/5610944.png' // default
}
</script>
