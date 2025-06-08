<template>
  <div class="p-4 max-w-4xl mx-auto">
    <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-4">Data Downline</h2>

    <div v-if="downlineStore.loading" class="text-gray-500">Memuat data downline...</div>
    <div v-else-if="Object.keys(data).length === 0" class="text-gray-500">
      Tidak ada data downline.
    </div>
    <div v-else>
      <!-- Tampilkan struktur data JSON -->
      <pre class="bg-gray-900 text-green-400 text-sm p-4 rounded overflow-auto"
        >{{ JSON.stringify(data, null, 2) }}
  </pre
      >

      <!-- Atau gabungkan dengan tampilan biasa -->
      <div v-for="(users, level) in data" :key="level" class="mb-6">
        <h3 class="font-semibold text-blue-600 dark:text-yellow-400 mb-2 uppercase">
          {{ level.replace('_', ' ') }}
        </h3>
        <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          <div
            v-for="user in users"
            :key="user.uid"
            class="p-4 bg-blue-100 dark:bg-gray-800 rounded shadow"
          >
            <p class="font-bold">{{ user.nama }} ({{ user.username }})</p>
            <p class="text-sm text-gray-700 dark:text-gray-300">HP: {{ user.hp }}</p>
            <p class="text-sm text-gray-700 dark:text-gray-300">
              Total Deposit: ${{ (user.total_deposit / 16000).toFixed(2) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useUserDataDownline } from '@/stores/userDataDownline'

const downlineStore = useUserDataDownline()

onMounted(() => {
  downlineStore.fetchDownline()
})

const data = computed(() => downlineStore.data)
</script>
