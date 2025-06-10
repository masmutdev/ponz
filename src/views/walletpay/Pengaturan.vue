<template>
  <div class="max-w-md mx-auto mt-2 mb-4 space-y-6">
    <h2 class="text-xl font-bold text-gray-800 dark:text-white text-center">Pengaturan</h2>
  </div>

  <div class="grid grid-cols-2 gap-4 max-w-md mx-auto mt-2">
    <div
      class="bg-blue-300 text-blue-800 dark:bg-blue-900 dark:text-white p-4 rounded-lg shadow text-center"
    >
      <p class="text-xs text-gray-600 dark:text-gray-300">Total Deposit</p>
      <p class="text-base font-bold text-gray-800 dark:text-white">
        {{ formatUSD(pengaturan.totalDeposit) }}
      </p>
    </div>

    <div
      class="bg-blue-300 text-blue-800 dark:bg-blue-900 dark:text-white p-4 rounded-lg shadow text-center"
    >
      <p class="text-xs text-gray-600 dark:text-gray-300">Total Withdraw</p>
      <p class="text-base font-bold text-gray-800 dark:text-white">
        {{ formatUSD(pengaturan.totalWithdraw) }}
      </p>
    </div>

    <div
      class="bg-blue-300 text-blue-800 dark:bg-blue-900 dark:text-white p-4 rounded-lg shadow text-center"
    >
      <p class="text-xs text-gray-600 dark:text-gray-300">Total Profit</p>
      <p class="text-base font-bold text-gray-800 dark:text-white">
        {{ formatUSD(pengaturan.totalBonus) }}
      </p>
    </div>

    <div
      class="bg-blue-300 text-blue-800 dark:bg-blue-900 dark:text-white p-4 rounded-lg shadow text-center"
    >
      <p class="text-xs text-gray-600 dark:text-gray-300">Total Staking</p>
      <p class="text-base font-bold text-gray-800 dark:text-white">
        {{ formatUSD(pengaturan.totalStaking) }}
      </p>
    </div>
  </div>
  <VIPBar class="my-5" />
  <div class="max-w-md mx-auto mt-2 space-y-6">
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
