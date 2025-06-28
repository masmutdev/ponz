<template>
  <!-- Info Card -->
  <div class="mt-1 relative rounded-lg overflow-hidden shadow-md w-full max-w-md h-[120px]">
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
          <span class="font-bold text-blue-950 dark:text-white duration-300">
            Available Balance
          </span>
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
        <div class="relative top-[-20px]">
          <h2 class="text-[40px] text-blue-950 dark:text-white font-semibold">
            {{ dashboard.saldoUSD }}
          </h2>
        </div>
        <span
          class="absolute italic text-[70px] top-[-40px] right-20 font-bold text-blue-950 dark:text-white duration-300"
          style="
            text-shadow:
              2px 2px 0 #000,
              4px 4px 0 #666;
          "
        >
          WP
        </span>
      </div>
    </div>
  </div>

  <div class="border border-gray-300 rounded-md overflow-hidden flex items-center mt-4">
    <img
      src="https://cdn-icons-png.flaticon.com/128/9019/9019234.png"
      alt="Speaker Icon"
      class="h-6 w-6 ml-2"
    />
    <marquee
      class="text-sm py-2 px-4 whitespace-nowrap"
      behavior="scroll"
      direction="left"
      scrollamount="5"
    >
      Selamat Bergabung Bersama Wallet Pay Business
    </marquee>
  </div>

  <div class="grid grid-cols-4 gap-4 text-center mt-4">
    <RouterLink
      to="/deposit"
      class="flex flex-col items-center p-2 w-20 h-20 rounded-full bg-gray-300 dark:bg-gray-800 shadow-md hover:shadow-lg transition"
    >
      <IconArrowBarToDown class="w-7 h-7 mb-2 text-blue-600" />
      <span class="text-sm font-semibold text-blue-900 dark:text-white">Deposit</span>
    </RouterLink>
    <RouterLink
      to="/withdraw"
      class="flex flex-col items-center p-2 w-20 h-20 rounded-full bg-gray-300 dark:bg-gray-800 shadow-md hover:shadow-lg transition"
    >
      <IconArrowBarUp class="w-7 h-7 mb-2 text-red-600" />
      <span class="text-sm font-semibold text-blue-900 dark:text-white">Withdraw</span>
    </RouterLink>
    <RouterLink
      to="/riwayat-transaksi"
      class="flex flex-col items-center p-2 w-20 h-20 rounded-full bg-gray-300 dark:bg-gray-800 shadow-md hover:shadow-lg transition"
    >
      <IconReportMoney class="w-7 h-7 mb-2 text-green-600" />
      <span class="text-sm font-semibold text-blue-900 dark:text-white">Transaksi</span>
    </RouterLink>
    <RouterLink
      to="/crypto"
      class="flex flex-col items-center p-2 w-20 h-20 rounded-full bg-gray-300 dark:bg-gray-800 shadow-md hover:shadow-lg transition"
    >
      <IconCoins class="w-7 h-7 mb-2 text-yellow-500" />
      <span class="text-sm font-semibold text-blue-900 dark:text-white">Staking</span>
    </RouterLink>
  </div>

  <div class="grid grid-cols-3 gap-4 mt-4">
    <div
      v-for="coin in dataCoin"
      :key="coin.kode"
      class="w-full h-20 rounded-lg border border-gray-400 flex flex-col justify-center items-center p-2"
    >
      <div class="flex items-center gap-1">
        <img :src="coin.icon" alt="icon" class="h-4 w-4 rounded-full" />
        <p
          :class="[
            'font-semibold text-sm',
            coin.kode === 'BTC' ? 'text-green-800' : 'text-blue-900',
          ]"
        >
          {{ coin.kode }}
        </p>
      </div>
      <p :class="['font-extrabold text-xl mt-1', coin.warna]">{{ coin.persen }}%</p>
    </div>
  </div>

  <!-- Coin Volume -->
  <div class="overflow-x-auto mt-6">
    <table
      class="min-w-full table-auto border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg overflow-hidden"
    >
      <thead class="bg-blue-500 dark:bg-indigo-600/30 text-white">
        <tr>
          <th
            colspan="3"
            class="px-6 py-3 text-center text-sm font-bold text-white dark:text-white"
          >
            Market Volume 24 Jam
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
        <tr
          v-for="coin in dataVolume"
          :key="coin.kode"
          class="hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <td class="px-6 py-4 text-sm text-gray-900 dark:text-white">
            <div class="flex items-center gap-2">
              <img :src="coin.icon" :alt="coin.kode" class="h-5 w-5 rounded-full" />
              <div>
                <div>{{ coin.nama }} ({{ coin.kode }})</div>
                <div class="text-xs text-gray-500 dark:text-gray-400">
                  ${{ coin.volume.toFixed(2) }}B
                </div>
              </div>
            </div>
          </td>
          <td class="px-6 py-4 text-sm text-gray-700 text-center dark:text-gray-300">
            ${{
              coin.harga.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            }}
          </td>
          <td
            class="px-6 py-4 text-sm text-center font-semibold"
            :class="coin.persen >= 0 ? 'text-green-500' : 'text-red-500'"
          >
            {{ coin.persen >= 0 ? '+' : '' }}{{ coin.persen }}%
          </td>
        </tr>
      </tbody>
    </table>

    <teleport to="body">
      <transition name="fade">
        <div
          v-if="showPengumuman"
          class="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 px-4"
        >
          <div
            class="relative bg-transparent rounded-lg overflow-hidden w-full max-w-md flex justify-center items-center"
          >
            <button
              @click="closePengumuman"
              class="absolute top-2 right-[5%] text-gray-600 dark:text-gray-200 z-10 p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <IconX :size="22" stroke-width="2.5" />
            </button>
            <img
              :src="pengumumanImg"
              alt="Pengumuman"
              class="w-full h-auto object-contain rounded-lg"
            />
          </div>
        </div>
      </transition>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import logo from '@/assets/1/logo.png'
import qr from '@/assets/1/qr-code.png'
import { ref, onMounted, onUnmounted } from 'vue'
import { useUserDashboard } from '@/stores/userDashboard'
import pengumumanImg from '@/assets/1/pengumuman2.jpeg'
import {
  IconX,
  IconArrowBarToDown,
  IconArrowBarUp,
  IconReportMoney,
  IconCoins,
} from '@tabler/icons-vue'

const dashboard = useUserDashboard()
const showPengumuman = ref(true)

const dataCoin = ref([
  {
    kode: 'BTC',
    warna: 'text-green-600',
    persen: 0,
    icon: new URL('@/assets/1/btc.png', import.meta.url).href,
  },
  {
    kode: 'ETH',
    warna: 'text-red-600',
    persen: 0,
    icon: new URL('@/assets/1/eth.png', import.meta.url).href,
  },
  {
    kode: 'SOL',
    warna: 'text-red-600',
    persen: 0,
    icon: new URL('@/assets/1/sol.png', import.meta.url).href,
  },
])

const dataVolume = ref([
  {
    kode: 'USDT',
    nama: 'Tether',
    icon: new URL('@/assets/1/usdt.png', import.meta.url).href,
    volume: 28.93,
    harga: 1.0,
    persen: 0.01,
  },
  {
    kode: 'BTC',
    nama: 'Bitcoin',
    icon: new URL('@/assets/1/btc.png', import.meta.url).href,
    volume: 45.31,
    harga: 46727.3,
    persen: 2.14,
  },
  {
    kode: 'ETH',
    nama: 'Ethereum',
    icon: new URL('@/assets/1/eth.png', import.meta.url).href,
    volume: 23.42,
    harga: 2609.3,
    persen: 1.82,
  },
  {
    kode: 'SOL',
    nama: 'Solana',
    icon: new URL('@/assets/1/sol.png', import.meta.url).href,
    volume: 3.48,
    harga: 22.11,
    persen: -0.34,
  },
  {
    kode: 'DOGE',
    nama: 'Dogecoin',
    icon: new URL('@/assets/1/doge.png', import.meta.url).href,
    volume: 1.81,
    harga: 0.22,
    persen: 0.95,
  },
])

let interval: any = null

const acakData = () => {
  dataCoin.value = dataCoin.value.map((coin) => {
    const angka = parseFloat((Math.random() * 5).toFixed(2))
    const naik = Math.random() > 0.5
    return {
      ...coin,
      persen: naik ? angka : -angka,
      warna: naik ? 'text-green-600' : 'text-red-600',
    }
  })
}

onMounted(() => {
  acakData()
  interval = setInterval(acakData, 3000)
})

onUnmounted(() => {
  clearInterval(interval)
})

let intervalVolume: any = null

const acakVolume = () => {
  dataVolume.value = dataVolume.value.map((coin) => {
    const change = parseFloat((Math.random() * 0.5).toFixed(2))
    const naik = Math.random() > 0.5
    const perubahan = naik ? change : -change

    return {
      ...coin,
      harga: parseFloat((coin.harga + perubahan).toFixed(2)),
      persen: parseFloat((naik ? change : -change).toFixed(2)),
    }
  })
}

onMounted(() => {
  intervalVolume = setInterval(acakVolume, 3000)
})

onUnmounted(() => {
  clearInterval(intervalVolume)
})

onMounted(() => {
  dashboard.fetchUserDashboard()
})

const closePengumuman = () => {
  showPengumuman.value = false
}

onMounted(() => {
  dashboard.fetchUserDashboard()
  showPengumuman.value = false // modal muncul pas mounted
})
</script>
