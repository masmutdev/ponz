<template>
  <div class="max-w-md mx-auto mt-2 space-y-6 px-4">
    <!-- Informasi VIP -->
    <div class="bg-blue-100 dark:bg-gray-800 p-4 rounded-lg shadow space-y-2 text-sm">
      <h3 class="text-md font-semibold text-gray-800 dark:text-white">📣 Program VIP Staking</h3>
      <ul class="text-gray-700 dark:text-gray-300 space-y-1">
        <li>VIP-1 → 15 Hari • 1.0% /hari</li>
        <li>VIP-2 → 30 Hari • 2.5% /hari</li>
        <li>VIP-3 → 90 Hari • 4.5% /hari</li>
        <li>VIP-4 → 120 Hari • 6.5% /hari</li>
      </ul>
      <p class="mt-2 text-xs text-gray-600 dark:text-gray-400">Minimum $15 — Maksimum $150</p>
    </div>

    <!-- Card koin -->
    <div
      v-for="coin in coins"
      :key="coin.name"
      class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow space-y-3"
    >
      <div class="flex items-center gap-3">
        <img :src="coin.icon" :alt="coin.name" class="h-8 w-8 rounded-full" />
        <div>
          <p class="font-semibold text-gray-800 dark:text-white">
            {{ coin.name }} ({{ coin.symbol }})
          </p>
          <p
            class="text-sm font-semibold"
            :class="coin.change.startsWith('+') ? 'text-green-500' : 'text-red-500'"
          >
            Quote Change: {{ coin.change }}
          </p>
          <p class="text-sm text-gray-600 dark:text-gray-400">Volume: {{ coin.volume }}</p>
        </div>
      </div>

      <!-- Pilihan hari -->
      <div>
        <label class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
          >Pilih Durasi Staking</label
        >
        <div class="grid grid-cols-2 gap-2">
          <button
            v-for="hari in coin.durations"
            :key="hari"
            @click="coin.selected = hari"
            :class="[
              'px-3 py-1 rounded text-sm font-medium border text-center',
              coin.selected === hari
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600',
            ]"
          >
            {{ hari }} Hari
          </button>
        </div>
      </div>

      <button
        class="w-full mt-2 bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
        @click="mulaiStaking(coin)"
      >
        Mulai Staking {{ coin.symbol }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import btc from '@/assets/1/btc.png'
import eth from '@/assets/1/eth.png'
import sol from '@/assets/1/sol.png'
import doge from '@/assets/1/doge.png'

const coins = reactive([
  {
    name: 'Bitcoin',
    symbol: 'BTC',
    icon: btc,
    volume: '$45.31B',
    change: '+2.14%',
    durations: [15, 30, 90, 120],
    selected: 15,
  },
  {
    name: 'Ethereum',
    symbol: 'ETH',
    icon: eth,
    volume: '$23.42B',
    change: '+1.82%',
    durations: [15, 30, 90, 120],
    selected: 15,
  },
  {
    name: 'Solana',
    symbol: 'SOL',
    icon: sol,
    volume: '$3.48B',
    change: '-0.34%',
    durations: [15, 30, 90, 120],
    selected: 15,
  },
  {
    name: 'Dogecoin',
    symbol: 'DOGE',
    icon: doge,
    volume: '$1.81B',
    change: '+0.95%',
    durations: [15, 30, 90, 120],
    selected: 15,
  },
])

const mulaiStaking = (coin) => {
  alert(`Staking ${coin.symbol} untuk ${coin.selected} hari dimulai.`)
  // Bisa kirim ke backend atau lanjut ke halaman detail staking
}
</script>
