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
              <td class="py-2 text-center">{{ member.hp }}</td>
              <td class="py-2 text-center">{{ member.level }}</td>
              <td class="py-2 text-center">Rp {{ member.deposit.toLocaleString() }}</td>
              <td class="py-2 text-center">Rp {{ member.staking.toLocaleString() }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const summary = [
  { label: 'Total Tim', value: '126' },
  { label: 'Total Tim Aktif', value: '89' },
  { label: 'Total Deposit Tim', value: 'Rp 5.120.000' },
  { label: 'Total Penarikan Tim', value: 'Rp 5.75.000' },
  { label: 'Total Staking Tim', value: 'Rp 5.200.000' },
  { label: 'Total Profit Tim', value: 'Rp 15.000.000' },
]

const tim = ref([
  { hp: '081234567890', level: 1, deposit: 3000000, staking: 1500000 },
  { hp: '089876543210', level: 2, deposit: 2500000, staking: 1000000 },
  { hp: '082112223334', level: 3, deposit: 1200000, staking: 500000 },
])
</script>
