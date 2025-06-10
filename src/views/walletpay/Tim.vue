<template>
  <div class="max-w-4xl mx-auto mt-2 space-y-6">
    <h2 class="text-xl font-bold text-gray-800 dark:text-white text-center">Jaringan Tim Anda</h2>

    <!-- 2 Kolom: Total Tim & Aktif -->
    <div class="grid grid-cols-2 gap-4">
      <div
        v-for="item in summary.slice(0, 2)"
        :key="item.label"
        class="bg-blue-300 text-blue-800 dark:bg-blue-900 dark:text-white p-4 rounded-lg shadow text-center"
      >
        <p class="text-[10px] text-gray-600 dark:text-gray-300">{{ item.label }}</p>
        <p class="text-xs font-semibold text-gray-800 dark:text-white">{{ item.value }}</p>
      </div>
    </div>

    <!-- 3 Kolom: Deposit, Penarikan, Profit Hari Ini -->
    <div class="grid grid-cols-3 gap-4">
      <div
        v-for="item in summary.slice(2, 5)"
        :key="item.label"
        class="bg-blue-300 text-blue-800 dark:bg-blue-900 dark:text-white p-4 rounded-lg shadow text-center"
      >
        <p class="text-[10px] text-gray-600 dark:text-gray-300">{{ item.label }}</p>
        <p class="text-xs font-semibold text-gray-800 dark:text-white">{{ item.value }}</p>
      </div>
    </div>

    <!-- 1 Kolom: Total Staking Tim -->
    <div class="mt-2">
      <div
        class="bg-blue-300 text-blue-800 dark:bg-blue-900 dark:text-white p-4 rounded-lg shadow text-center"
      >
        <p class="text-[10px] text-gray-600 dark:text-gray-300">{{ summary[5].label }}</p>
        <p class="text-xs font-semibold text-gray-800 dark:text-white">{{ summary[5].value }}</p>
      </div>
    </div>

    <!-- Tabel Tim -->
    <div class="bg-blue-100 dark:bg-gray-800 rounded-lg shadow p-4">
      <h3 class="text-md font-semibold text-gray-800 dark:text-white mb-3 text-center">
        Daftar Tim Level Anda
      </h3>
      <div class="overflow-auto">
        <table class="min-w-[600px] w-full text-sm text-left text-gray-700 dark:text-gray-300">
          <thead>
            <tr class="border-b border-gray-300 dark:border-gray-600">
              <th class="py-2 text-center">No</th>
              <th class="py-2 text-center">Nama</th>
              <th class="py-2 text-center">Email</th>
              <th class="py-2 text-center">No HP</th>
              <th class="py-2 text-center">Level</th>
              <th class="py-2 text-center">Deposit</th>
              <th class="py-2 text-center">Staking</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(member, index) in tim"
              :key="index"
              class="border-b border-gray-200 dark:border-gray-700"
            >
              <td class="py-2 text-center">{{ index + 1 }}</td>
              <td class="py-2 text-center">{{ member.nama }}</td>
              <td class="py-2 text-center">{{ member.email }}</td>
              <td class="py-2 text-center">{{ member.hp }}</td>
              <td class="py-2 text-center">{{ member.level }}</td>
              <td class="py-2 text-center">{{ formatUSD(member.deposit) }}</td>
              <td class="py-2 text-center">{{ formatUSD(member.staking) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useUserDataDownline } from '@/stores/userDataDownline'

const store = useUserDataDownline()

onMounted(() => {
  store.fetchDownline()
})

const formatUSD = (value) => {
  const usd = Number(value) / 16000
  return '$' + usd.toFixed(2)
}

const summary = computed(() => {
  const allLevels = Object.values(store.data || {})
  const allUsers = allLevels.flatMap((l) => l.users || [])

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

const tim = computed(() => {
  const allLevels = Object.entries(store.data || {})

  return allLevels.flatMap(([levelKey, data]) =>
    (data.users || []).map((user) => ({
      nama: user.nama,
      email: user.email,
      hp: user.hp,
      level: levelKey.replace('level_', ''),
      deposit: Number(user.total_deposit),
      staking: Number(user.total_staking),
    })),
  )
})
</script>
