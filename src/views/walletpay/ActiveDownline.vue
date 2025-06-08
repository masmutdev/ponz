<template>
  <div class="p-4 max-w-xl mx-auto">
    <h2 class="text-xl font-bold text-gray-800 dark:text-white mb-4">Active Downline (Level 1)</h2>

    <div v-if="store.loading" class="text-gray-500">Memuat data...</div>
    <div v-else-if="store.error" class="text-red-500">{{ store.error }}</div>
    <div v-else>
      <pre class="bg-gray-900 text-green-400 text-sm p-4 rounded overflow-auto"
        >{{ JSON.stringify({ totalActiveUser: store.totalActiveUser, vip: store.vip }, null, 2) }}
      </pre>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useUserActiveDownline } from '@/stores/userActiveDownline'

const store = useUserActiveDownline()

onMounted(() => {
  store.fetchActiveDownline()
})
</script>
