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
      <div v-if="dataDeposit.length === 0" class="text-center text-gray-500">
        Belum ada Data Deposit.
      </div>

      <div
        v-for="item in dataDeposit"
        :key="item.id"
        class="p-4 rounded-lg shadow bg-white dark:bg-gray-800 text-sm space-y-2"
      >
        <div class="flex justify-between items-center">
          <p class="font-semibold text-blue-800 dark:text-blue-400">Transaksi Deposit</p>
          <p class="font-semibold text-blue-800 dark:text-blue-400">
            {{ formatUSD(item.nominal) }}
          </p>
        </div>

        <p class="text-xs text-gray-600 dark:text-gray-300 text-center">
          {{ item.created_at }}
        </p>

        <p class="text-gray-500 dark:text-gray-400 text-center">
          Invoice: {{ item.invoice }} | Order ID: {{ item.order_id }}
        </p>
        <p class="text-gray-500 dark:text-gray-400 text-center">
          {{ item.bank }} - {{ item.norek }}
        </p>

        <p class="text-gray-500 dark:text-gray-400 text-center">
          {{ getKeterangan(statusLabel(item.status), false) }}
        </p>

        <div class="flex justify-center">
          <span
            class="px-3 py-1 rounded-full text-xs font-medium"
            :class="getStatusClass(statusLabel(item.status))"
          >
            {{ statusLabel(item.status) }}
          </span>
        </div>
      </div>
    </div>

    <!-- Card Withdraw -->
    <div v-else class="space-y-3">
      <div v-if="dataWithdraw.length === 0" class="text-center text-gray-500">
        Belum ada Data Withdraw.
      </div>

      <div
        v-else
        v-for="item in dataWithdraw"
        :key="item.id"
        class="p-4 rounded-lg shadow bg-white dark:bg-gray-800 text-sm space-y-2"
      >
        <div class="flex justify-between items-center">
          <p class="font-semibold text-blue-800 dark:text-blue-400">Transaksi Withdraw</p>
          <p class="font-semibold text-blue-800 dark:text-blue-400">
            {{ formatUSD(item.nominal) }}
          </p>
        </div>
        <p class="text-xs text-gray-600 dark:text-gray-300 text-center">
          {{ item.created_at }}
        </p>
        <p
          v-if="item.bank || item.pemilik || item.rekening"
          class="text-gray-500 dark:text-gray-400 text-center"
        >
          {{ item.bank }}
          <span v-if="item.bank && item.pemilik"> - </span>
          {{ item.pemilik }}
          <span v-if="item.pemilik && item.rekening"> ({{ item.rekening }})</span>
        </p>
        <p class="text-gray-500 dark:text-gray-400 text-center">
          {{ getKeterangan(statusLabel(item.status), tab === 'withdraw') }}
        </p>
        <div class="flex justify-center">
          <span
            class="px-3 py-1 rounded-full text-xs font-medium"
            :class="getStatusClass(statusLabel(item.status))"
          >
            {{ statusLabel(item.status) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, computed } from 'vue'
import { useUserRiwayatDeposit } from '@/stores/userRiwayatDeposit'
import { useUserRiwayatWithdraw } from '@/stores/userRiwayatWithdraw'

const tab = ref('deposit')

const depositStore = useUserRiwayatDeposit()
const withdrawStore = useUserRiwayatWithdraw()

const dataDeposit = computed(() =>
  depositStore.data.map((item, index) => ({
    id: index + 1,
    nominal: item.jumlah,
    created_at: item.created_at,
    status: Number(item.status),
    invoice: item.invoice,
    order_id: item.order_id,
    bank: item.bank || '-',
    norek: item.norek || '-',
  })),
)

const dataWithdraw = computed(() =>
  withdrawStore.data.map((item, index) => ({
    id: index + 1,
    nominal: item.jumlah_withdraw,
    created_at: item.created_at,
    status: Number(item.status),
    bank: item.bank?.trim() ? item.bank : null,
    pemilik: item.pemilik?.trim() ? item.pemilik : null,
    rekening: item.rekening?.trim() ? item.rekening : null,
  })),
)

const fetchTabData = async (currentTab) => {
  if (currentTab === 'deposit' && depositStore.data.length === 0) {
    await depositStore.fetchRiwayatDeposit()
  } else if (currentTab === 'withdraw' && withdrawStore.data.length === 0) {
    await withdrawStore.fetchRiwayatWithdraw()
  }
}

onMounted(() => {
  fetchTabData(tab.value)
})

watch(tab, (val) => {
  fetchTabData(val)
})

const statusLabel = (status) => {
  switch (status) {
    case 1:
      return 'Lunas'
    case 0:
      return 'Pending'
    case 2:
      return 'Failed'
    case 3:
      return 'Expired'
    default:
      return '-'
  }
}

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

const formatUSD = (angka) => {
  return `$${(angka / 16000).toFixed(2)}`
}
</script>
