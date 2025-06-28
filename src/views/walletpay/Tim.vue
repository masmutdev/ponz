<template>
  <div class="max-w-4xl mx-auto mt-2 space-y-6">
    <h2 class="text-xl font-bold text-gray-800 dark:text-white text-center">Jaringan Tim Anda</h2>

    <div class="bg-white dark:bg-gray-800 rounded-lg shadow space-y-3 p-4">
      <!-- Stats Bar -->
      <div class="grid grid-cols-3 gap-2 text-center">
        <div>
          <p class="font-bold text-lg text-blue-900">{{ Number(totalTeam.value) }}</p>
          <p class="text-xs text-gray-600">{{ totalTeam.label }}</p>
          <p class="font-bold text-sm text-green-600">{{ totalStaking.value }}</p>
          <p class="text-xs text-gray-600">{{ totalStaking.label }}</p>
        </div>
        <div>
          <p class="font-bold text-lg text-blue-900">{{ Number(totalActive.value) }}</p>
          <p class="text-xs text-gray-600">{{ totalActive.label }}</p>
          <p class="font-bold text-sm text-green-600">{{ totalDeposit.value }}</p>
          <p class="text-xs text-gray-600">{{ totalDeposit.label }}</p>
        </div>
        <div>
          <p class="font-bold text-lg text-green-600">{{ totalDeposit.value }}</p>
          <p class="text-xs text-gray-600">{{ totalDeposit.label }}</p>
          <p class="font-bold text-sm text-green-600">{{ totalWithdraw.value }}</p>
          <p class="text-xs text-gray-600">{{ totalWithdraw.label }}</p>
        </div>
      </div>

      <!-- Progress -->
      <div class="mt-2">
        <p class="text-sm font-semibold text-blue-700">Pengguna Langsung</p>
        <div class="relative w-full h-2 rounded-full bg-gray-200 mt-1">
          <div
            class="absolute top-0 left-0 h-full bg-blue-600 rounded-full"
            :style="{ width: `${Math.max(1, (Number(totalActive.value) / 10) * 100)}%` }"
          ></div>
        </div>
        <div class="flex justify-between text-xs mt-1 text-gray-600">
          <span>Investasi Anggota Aktif</span>
          <span
            :class="Number(totalActive.value) >= 10 ? 'text-green-600' : 'text-red-600'"
            class="font-semibold"
          >
            {{ Number(totalActive.value) }} Sampai 10
          </span>
        </div>
      </div>

      <!-- Data Peringkat -->
      <div class="bg-blue-900 text-white rounded-md mt-4 p-2 text-sm font-bold">
        Data Peringkat anggota (1)
      </div>

      <div class="space-y-2 mt-2">
        <div
          v-for="(item, i) in tim"
          :key="i"
          class="flex items-center justify-between bg-white dark:bg-gray-100 border rounded px-3 py-2"
        >
          <div class="flex items-center gap-2">
            <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" class="w-6 h-6" />
            <div>
              <p class="text-sm font-semibold">{{ item.hp }}</p>
              <p class="text-xs text-gray-600">{{ formatTanggal(item.created_at) }}</p>
            </div>
          </div>
          <p
            :class="item.deposit > 0 ? 'text-green-600' : 'text-red-600'"
            class="text-sm font-semibold"
          >
            {{ item.deposit > 0 ? 'Aktif' : 'Nonaktif' }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useUserDataDownline } from '@/stores/userDataDownline'

const store = useUserDataDownline()

onMounted(() => {
  store.fetchDownline()
})

const formatUSD = (value: number | string) => {
  const usd = Number(value) / 16000
  return '$' + usd.toFixed(2)
}

const formatTanggal = (tanggal: string | undefined) => {
  if (!tanggal) return '-'
  const d = new Date(tanggal)
  return d.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const summary = computed(() => {
  const allLevels = Object.values(store.data || {})
  const allUsers = allLevels.flatMap((l: any) => l.users || [])

  const totalTeam = allUsers.length
  const totalActive = allUsers.filter((u) => u.total_deposit > 0).length

  const totalDeposit = allUsers.reduce((acc, u) => acc + Number(u.total_deposit), 0)
  const totalWithdraw = allUsers.reduce((acc, u) => acc + Number(u.total_withdraw), 0)
  const totalProfit = allUsers.reduce((acc, u) => acc + Number(u.total_profit), 0)
  const totalStaking = allUsers.reduce((acc, u) => acc + Number(u.total_staking), 0)

  return [
    { label: 'Total Tim', value: totalTeam },
    { label: 'Anggota Aktif', value: totalActive },
    { label: 'Deposit', value: formatUSD(totalDeposit) },
    { label: 'Penarikan', value: formatUSD(totalWithdraw) },
    { label: 'Profit Hari Ini', value: formatUSD(totalProfit) },
    { label: 'Total Staking Tim', value: formatUSD(totalStaking) },
  ]
})

const totalTeam = computed(() => summary.value[0])
const totalActive = computed(() => summary.value[1])
const totalDeposit = computed(() => summary.value[2])
const totalWithdraw = computed(() => summary.value[3])
const profitHarian = computed(() => summary.value[4])
const totalStaking = computed(() => summary.value[5])

const tim = computed(() => {
  const allLevels = Object.entries(store.data || {})

  return allLevels.flatMap(([levelKey, data]: any) =>
    (data.users || []).map((user: any) => ({
      nama: user.nama,
      email: user.email,
      hp: user.hp,
      level: levelKey.replace('level_', ''),
      deposit: Number(user.total_deposit),
      staking: Number(user.total_staking),
      created_at: user.created_at,
    })),
  )
})
</script>
