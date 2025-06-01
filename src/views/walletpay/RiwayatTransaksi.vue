<template>
  <div class="max-w-2xl mx-auto mt-2 p-4 space-y-4">
    <!-- Tabs -->
    <div class="flex gap-2">
      <button
        :class="[
          'flex-1 py-2 rounded text-sm font-semibold',
          tab === 'deposit'
            ? 'bg-blue-300 text-blue-800 dark:bg-blue-900 dark:text-white'
            : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400',
        ]"
        @click="tab = 'deposit'"
      >
        Transaksi Deposit
      </button>
      <button
        :class="[
          'flex-1 py-2 rounded text-sm font-semibold',
          tab === 'withdraw'
            ? 'bg-blue-300 text-blue-800 dark:bg-blue-900 dark:text-white'
            : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400',
        ]"
        @click="tab = 'withdraw'"
      >
        Transaksi Withdraw
      </button>
    </div>

    <!-- Card Deposit -->
    <div v-if="tab === 'deposit'" class="space-y-3">
      <div
        v-for="item in dataDeposit"
        :key="item.id"
        class="p-4 rounded-lg shadow bg-white dark:bg-gray-800 text-sm space-y-2"
      >
        <div class="flex justify-between items-center">
          <p class="font-semibold text-blue-800 dark:text-blue-400">Transaksi Deposit</p>
          <p class="font-semibold text-blue-800 dark:text-blue-400">Rp. {{ item.nominal }}</p>
        </div>
        <p class="text-xs text-gray-600 dark:text-gray-300 text-center">
          {{ item.created_at }}
        </p>

        <p class="text-gray-500 dark:text-gray-400 text-center">{{ getKeterangan(item.status) }}</p>

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

    <!-- Card Withdraw -->
    <div v-else class="space-y-3">
      <div
        v-for="item in dataWithdraw"
        :key="item.id"
        class="p-4 rounded-lg shadow bg-white dark:bg-gray-800 text-sm space-y-2"
      >
        <div class="flex justify-between items-center">
          <p class="font-semibold text-blue-800 dark:text-blue-400">Transaksi Withdraw</p>
          <p class="font-semibold text-blue-800 dark:text-blue-400">Rp. {{ item.nominal }}</p>
        </div>
        <p class="text-xs text-gray-600 dark:text-gray-300 text-center">
          {{ item.created_at }}
        </p>

        <p class="text-gray-500 dark:text-gray-400 text-center">
          {{ item.bank }} - {{ item.pemilik }} ({{ item.rekening }})
        </p>
        <p class="text-gray-500 dark:text-gray-400 text-center">
          {{ getKeterangan(item.status, true) }}
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
  </div>
</template>
<script setup>
import { ref } from 'vue'

const tab = ref('deposit')

const dataDeposit = [
  { id: 1, nominal: 300000, created_at: '2025-05-30 14:00', status: 'Lunas' },
  { id: 2, nominal: 150000, created_at: '2025-05-28 10:30', status: 'Pending' },
]

const dataWithdraw = [
  {
    id: 1,
    nominal: 250000,
    created_at: '2025-05-27 09:00',
    bank: 'BCA',
    pemilik: 'Andi Saputra',
    rekening: '1234567890',
    status: 'Lunas',
  },
  {
    id: 2,
    nominal: 100000,
    created_at: '2025-05-26 16:20',
    bank: 'Mandiri',
    pemilik: 'Budi Santoso',
    rekening: '9876543210',
    status: 'Pending',
  },
]

const getKeterangan = (status, isWithdraw = false) => {
  if (status === 'Lunas') return isWithdraw ? 'Withdraw Berhasil' : 'Pembayaran Berhasil'
  if (status === 'Pending') return 'Menunggu proses'
  if (status === 'Failed') return 'Transaksi gagal'
  if (status === 'Expired') return 'Transaksi kadaluarsa'
  return '-'
}

const getStatusClass = (status) => {
  return {
    'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300': status === 'Lunas',
    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300': status === 'Pending',
    'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300':
      status === 'Failed' || status === 'Expired',
  }
}
</script>
