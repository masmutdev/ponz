<template>
  <div class="max-w-md mx-auto mt-2 mb-4 space-y-6">
    <h2 class="text-xl font-bold text-gray-800 dark:text-white text-left">
      Halo, {{ pengaturan.namaUser }}
    </h2>
  </div>

  <div
    class="relative bg-gradient-to-b from-blue-700 to-blue-400 rounded-xl p-4 text-white flex justify-between items-start w-full max-w-md"
  >
    <!-- Kiri: Logo dan info -->
    <div class="flex flex-col">
      <div class="flex items-center gap-2 mb-1">
        <img src="@/assets/1/logo.png" alt="wallet" class="w-6 h-6" />
        <span class="text-sm font-medium">Ewallet/Bank</span>
      </div>
      <p class="text-lg font-bold tracking-wide">{{ pengaturan.hpUser }}</p>
    </div>

    <!-- Kanan: Icon avatar -->
    <div class="absolute -top-4 right-4 bg-yellow-400 p-1 rounded-full">
      <img
        src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
        alt="user"
        class="w-15 h-15 object-contain"
      />
    </div>
  </div>

  <div class="relative mb-12">
    <div class="grid grid-cols-3 gap-6 text-center mt-4">
      <div>
        <p class="font-bold text-black">{{ formatUSD(pengaturan.totalDeposit) }}</p>
        <p class="text-xs text-gray-700">Total Deposit</p>
      </div>
      <div>
        <p class="font-bold text-black">{{ formatUSD(pengaturan.totalWithdraw) }}</p>
        <p class="text-xs text-gray-700">Total Profit</p>
      </div>
      <div>
        <p class="font-bold text-black">{{ formatUSD(pengaturan.totalBonus) }}</p>
        <p class="text-xs text-gray-700">Total Withdraw</p>
      </div>
      <div>
        <p class="font-bold text-black">{{ formatUSD(pengaturan.totalBonus) }}</p>
        <p class="text-xs text-gray-700">Total Withdraw</p>
      </div>
    </div>

    <VIPBar class="my-5 absolute right-0 top-[40px] w-[300px] h-[50px]" />
  </div>

  <div class="max-w-md mx-auto mt-2 space-y-6 rounded-lg border p-2">
    <div class="space-y-1">
      <h3 class="text-sm font-semibold text-gray-600 dark:text-gray-300 px-2 my-4">Menu Saya</h3>
      <div
        v-for="item in menuSaya"
        :key="item.label"
        class="flex my-4 items-center justify-between p-4 rounded-lg shadow bg-blue-100 dark:bg-gray-800 text-gray-800 dark:text-white"
      >
        <router-link :to="item.to" class="flex items-center gap-3 w-full">
          <component :is="item.icon" class="w-5 h-5" />
          <span class="flex-1 text-sm font-medium">{{ item.label }}</span>
          <IconChevronRight class="w-4 h-4" />
        </router-link>
      </div>
    </div>

    <div class="space-y-1">
      <h3 class="text-sm font-semibold text-gray-600 dark:text-gray-300 px-2 my-4">Informasi</h3>
      <div
        v-for="item in informasi"
        :key="item.label"
        class="flex my-4 items-center justify-between p-4 rounded-lg shadow bg-blue-100 dark:bg-gray-800 text-gray-800 dark:text-white"
      >
        <router-link :to="item.to" class="flex items-center gap-3 w-full">
          <component :is="item.icon" class="w-5 h-5" />
          <span class="flex-1 text-sm font-medium">{{ item.label }}</span>
          <IconChevronRight class="w-4 h-4" />
        </router-link>
      </div>
    </div>

    <div>
      <div
        class="flex items-center justify-between p-4 rounded-lg shadow bg-red-500 dark:bg-red-500 text-gray-800 dark:text-white"
      >
        <button @click="handleLogout" class="flex items-center w-full">
          <span class="flex-1 text-sm font-bold">Logout</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import VIPBar from '@/components/ui/walletpay/VIPBar.vue'
import {
  IconChevronRight,
  IconLock,
  IconBuildingBank,
  IconHistory,
  IconCoin,
  IconGift,
  IconLink,
  IconInfoCircle,
  IconHelpCircle,
  IconFileDescription,
  IconLogout,
} from '@tabler/icons-vue'
import { useRouter } from 'vue-router'
import { useUserLogout } from '@/stores/userLogout'
import { onMounted } from 'vue'
import { userPengaturan } from '@/stores/userPengaturan'

const pengaturan = userPengaturan()

onMounted(() => {
  pengaturan.fetchPengaturan()
})

const formatUSD = (value) => {
  const usd = Number(value) / 16000
  return '$' + usd.toFixed(2)
}

const router = useRouter()
const logoutStore = useUserLogout()

const handleLogout = async () => {
  await logoutStore.logout()
  router.replace({ path: '/login', query: { message: 'Logout berhasil' } })
}

const menuSaya = [
  { label: 'Keamanan', to: '/keamanan', icon: IconLock },
  { label: 'Data Penarikan', to: '/data-penarikan', icon: IconBuildingBank },
  { label: 'Riwayat Transaksi', to: '/riwayat-transaksi', icon: IconHistory },
  { label: 'Riwayat Staking', to: '/riwayat-staking', icon: IconCoin },
  { label: 'Bonus dan Profit', to: '/bonus-profit', icon: IconGift },
  { label: 'Tautan Undangan', to: '/undangan', icon: IconLink },
]

const informasi = [
  { label: 'Tentang Kami', to: '/tentang-kami', icon: IconInfoCircle },
  { label: 'FAQ', to: '/faq', icon: IconHelpCircle },
  { label: 'Syarat dan Kebijakan', to: '/syarat-dan-kebijakan', icon: IconFileDescription },
]
</script>
