<template>
  <!-- Info Card -->
  <div class="mt-1 relative rounded-lg overflow-hidden shadow-md w-full max-w-md">
    <div
      class="absolute inset-0 bg-[url('@/assets/1/wave.jpg')] bg-cover bg-center mix-blend-overlay opacity-40 z-11"
    ></div>
    <div
      class="absolute inset-0 bg-[url('@/assets/1/wave2.png')] bg-cover bg-center mix-blend-soft-light z-12"
    ></div>
    <div class="absolute inset-0 bg-blue-500/70 dark:bg-blue-950/80 backdrop-blur-sm z-10"></div>
    <div class="relative z-12 flex justify-between items-center gap-2 p-4">
      <div class="flex justify-start items-center">
        <img :src="logo" alt="Logo" class="h-6 w-6" />
        <div class="flex items-center gap-1 ml-2">
          <span class="font-bold text-blue-950 dark:text-white duration-300"> WALLET </span>
          <span class="font-bold text-blue-950 dark:text-white duration-300"> PAY </span>
        </div>
      </div>
      <div class="flex justify-start items-center">
        <router-link to="/undangan">
          <img :src="qr" alt="QR" class="h-6 w-6 dark:invert invert-0 cursor-pointer" />
        </router-link>
      </div>
    </div>
    <div class="relative z-20 py-2 text-white">
      <div class="flex flex-row justify-between items-center px-4">
        <div class="flex flex-col justify-start items-start">
          <h2 class="text-sm text-blue-950 dark:text-white font-semibold">
            {{ dashboard.user?.nama }}
          </h2>
          <h2 class="text-sm text-blue-950 dark:text-white font-semibold">
            {{ dashboard.user?.hp }}
          </h2>
        </div>
        <div class="flex flex-col justify-start items-start">
          <h2 class="text-sm text-blue-950 dark:text-white font-semibold">SALDO</h2>
          <h2 class="text-sm text-blue-950 dark:text-white font-semibold">
            {{ dashboard.saldoUSD }}
          </h2>
        </div>
      </div>

      <!-- Garis pembatas -->
      <div class="border-t border-blue-950 dark:border-white my-4"></div>

      <!-- Tombol aksi -->
      <div class="flex justify-between gap-4 px-4">
        <router-link
          to="/deposit"
          class="flex-1 text-center bg-white/50 text-blue-950 font-semibold py-2 rounded-md hover:bg-blue-100 transition shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
        >
          Deposit
        </router-link>
        <router-link
          to="/withdraw"
          class="flex-1 text-center bg-white/50 text-blue-950 font-semibold py-2 rounded-md hover:bg-blue-100 transition shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
        >
          Withdraw
        </router-link>
      </div>
    </div>
  </div>

  <!-- Stacking Area -->
  <div class="grid grid-cols-2 gap-4 items-center mt-5">
    <!-- Kolom 1: Gambar -->
    <div class="flex justify-center rounded-lg shadow-md">
      <img
        src="@/assets/1/ai-robot.png"
        alt="AI Robot"
        class="h-60 w-full object-cover rounded-lg shadow-md"
      />
    </div>

    <!-- Kolom 2: Info Pendapatan -->
    <div class="flex flex-col gap-4 h-60">
      <!-- Card: Total Pendapatan -->
      <div
        class="flex-1 rounded-lg bg-blue-500 dark:bg-indigo-500/30 p-4 shadow-md h-full bg-cover bg-center relative"
        :style="{ backgroundImage: `url(${serverBg})` }"
      >
        <!-- Overlay gelap + blur -->
        <div class="absolute inset-0 bg-black/30 backdrop-blur-[2px] rounded-lg z-0"></div>

        <div class="flex flex-col justify-center items-center relative z-2">
          <img
            src="@/assets/1/bitcoin.png"
            alt="Bitcoin"
            class="w-10 h-10 object-cover rounded-lg shadow-md"
          />
          <div class="flex flex-col justify-center items-center">
            <p class="text-sm text-blue-200 font-semibold mt-1">Memulai Staking</p>
            <router-link to="/crypto">
              <button
                class="w-full bg-indigo-500/50 text-white font-semibold py-1 px-4 mt-2 rounded-md hover:bg-blue-100 hover:text-indigo-800 transition shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
              >
                Mulai
              </button>
            </router-link>
          </div>
        </div>
      </div>

      <!-- Card: Total Profit -->
      <div
        class="relative flex-1 rounded-lg bg-blue-500 dark:bg-indigo-500/30 p-4 shadow-md h-full"
      >
        <!-- Gambar kecil di pojok kanan atas -->
        <img
          src="@/assets/1/stock-chart.png"
          alt="Chart"
          class="absolute top-2 right-2 h-10 w-10 object-contain opacity-50"
        />
        <p class="text-sm text-blue-200 font-semibold">Total Profit</p>
        <p class="text-lg text-white font-bold">{{ dashboard.bonusProfitUSD }}</p>
      </div>
    </div>
  </div>

  <!-- Coin Volume -->
  <div class="overflow-x-auto mt-6">
    <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-4">Market Volume 24 Jam</h2>
    <table
      class="min-w-full table-auto border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg overflow-hidden"
    >
      <thead class="bg-blue-500 dark:bg-indigo-600/30 text-white">
        <tr>
          <th class="px-6 py-3 text-center text-sm font-medium">Name / 24h Transaction Volume</th>
          <th class="px-6 py-3 text-center text-sm font-medium">Latest Price</th>
          <th class="px-6 py-3 text-center text-sm font-medium">Quote Change</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
        <tr class="hover:bg-gray-100 dark:hover:bg-gray-800">
          <td class="px-6 py-4 text-sm text-gray-900 dark:text-white">
            <div class="flex items-center gap-2">
              <img src="@/assets/1/btc.png" alt="BTC" class="h-5 w-5" />
              <div>
                <div>Bitcoin (BTC)</div>
                <div class="text-xs text-gray-500 dark:text-gray-400">$45.31B</div>
              </div>
            </div>
          </td>
          <td class="px-6 py-4 text-sm text-gray-700 text-center dark:text-gray-300">$46,727.30</td>
          <td class="px-6 py-4 text-sm text-green-500 text-center font-semibold">+2.14%</td>
        </tr>
        <tr class="hover:bg-gray-100 dark:hover:bg-gray-800">
          <td class="px-6 py-4 text-sm text-gray-900 dark:text-white">
            <div class="flex items-center gap-2">
              <img src="@/assets/1/eth.png" alt="ETH" class="h-5 w-5 rounded-full" />
              <div>
                <div>Ethereum (ETH)</div>
                <div class="text-xs text-gray-500 dark:text-gray-400">$23.42B</div>
              </div>
            </div>
          </td>
          <td class="px-6 py-4 text-sm text-gray-700 text-center dark:text-gray-300">$2,609.30</td>
          <td class="px-6 py-4 text-sm text-green-500 text-center font-semibold">+1.82%</td>
        </tr>
        <tr class="hover:bg-gray-100 dark:hover:bg-gray-800">
          <td class="px-6 py-4 text-sm text-gray-900 dark:text-white">
            <div class="flex items-center gap-2">
              <img src="@/assets/1/sol.png" alt="SOL" class="h-5 w-5 rounded-full" />
              <div>
                <div>Solana (SOL)</div>
                <div class="text-xs text-gray-500 dark:text-gray-400">$3.48B</div>
              </div>
            </div>
          </td>
          <td class="px-6 py-4 text-sm text-gray-700 text-center dark:text-gray-300">$22.11</td>
          <td class="px-6 py-4 text-sm text-red-500 text-center font-semibold">-0.34%</td>
        </tr>
        <tr class="hover:bg-gray-100 dark:hover:bg-gray-800">
          <td class="px-6 py-4 text-sm text-gray-900 dark:text-white">
            <div class="flex items-center gap-2">
              <img src="@/assets/1/doge.png" alt="DOGE" class="h-5 w-5 rounded-full" />
              <div>
                <div>Dogecoin (DOGE)</div>
                <div class="text-xs text-gray-500 dark:text-gray-400">$1.81B</div>
              </div>
            </div>
          </td>
          <td class="px-6 py-4 text-sm text-gray-700 text-center dark:text-gray-300">$0.22</td>
          <td class="px-6 py-4 text-sm text-green-500 text-center font-semibold">+0.95%</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import serverBg from '@/assets/1/server-room.png'
import logo from '@/assets/1/logo.png'
import qr from '@/assets/1/qr-code.png'
import { onMounted } from 'vue'
import { useUserDashboard } from '@/stores/userDashboard'

const dashboard = useUserDashboard()

onMounted(() => {
  dashboard.fetchUserDashboard()
})
</script>
