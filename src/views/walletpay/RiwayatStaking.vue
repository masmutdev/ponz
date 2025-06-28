<template>
  <div class="max-w-2xl mx-auto mt-2 p-4 space-y-4">
    <h2 class="text-lg font-bold text-center text-blue-800 dark:text-blue-400">
      Rekaman Transaksi
    </h2>

    <div v-if="store.loading" class="text-center text-sm text-gray-500">Memuat…</div>
    <div v-else-if="store.error" class="text-center text-sm text-red-500">
      {{ store.error }}
    </div>

    <!-- Kartu riwayat -->
    <div
      v-for="item in store.data"
      :key="item.id"
      class="bg-slate-200 dark:bg-gray-800 rounded-lg p-4 shadow-sm space-y-2"
    >
      <!-- Baris nominal -->
      <div class="grid grid-cols-3 text-center text-sm font-sans text-blue-900 dark:text-blue-300">
        <div>
          <div class="font-bold capitalize">
            {{ item.nama_produk || 'Produk' }}
          </div>
          <div class="font-bold text-green-700 dark:text-green-400">
            ${{ (item.harga || 0).toLocaleString() }}
          </div>
        </div>

        <div>
          <div>Harian</div>
          <div class="font-bold text-green-700 dark:text-green-400">
            ${{ item.profit_perhari.toLocaleString() }}
          </div>
        </div>

        <div>
          <div>Keuntungan</div>
          <div class="font-bold text-green-700 dark:text-green-400">
            ${{ item.total_profit.toLocaleString() }}
          </div>
        </div>
      </div>

      <!-- Label -->
      <div
        class="grid grid-cols-3 text-center text-xs font-sans text-blue-900 dark:text-blue-300 mt-1"
      >
        <div>Tgl&nbsp;Dibuat</div>
        <div>Tgl&nbsp;Akhir</div>
        <div>Status</div>
      </div>

      <!-- Nilai -->
      <div class="grid grid-cols-3 text-center text-xs font-sans mt-1">
        <div class="text-green-700 dark:text-green-400">
          {{ formatDate(item.created_at) }}
        </div>
        <div class="text-red-600 dark:text-red-400">
          {{ formatDate(addDays(item.created_at, item.durasi)) }}
        </div>
        <div>
          <span
            class="inline-block px-3 py-1 rounded-md font-semibold"
            :class="badgeClass(item.status)"
          >
            {{ statusText(item.status) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRiwayatStaking } from '@/stores/userRiwayatStaking'

const store = useRiwayatStaking()

onMounted(() => {
  store.fetchRiwayat()
})

/** Format: 10-Jun-2025 (lokal ID) */
const formatDate = (dateStr: string | Date) =>
  new Date(dateStr).toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })

/** created_at + durasi(hari)  → Date */
const addDays = (dateStr: string | Date, days: number) => {
  const d = new Date(dateStr)
  d.setDate(d.getDate() + Number(days))
  return d
}

/** Teks status */
const statusText = (status: number | string) => {
  const s = Number(status)
  return s === 0 ? 'Processing' : s === 1 ? 'Selesai' : 'Gagal'
}

/** Warna badge status */
const badgeClass = (status: number | string) => {
  const s = Number(status)
  return {
    'bg-yellow-400 text-yellow-900': s === 0,
    'bg-green-500 text-white': s === 1,
    'bg-red-500 text-white': s === 2,
  }
}
</script>
