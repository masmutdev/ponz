<template>
  <div
    class="max-w-md mx-auto bg-blue-300 text-blue-800 dark:bg-blue-900 dark:text-white p-4 rounded-lg shadow space-y-2"
  >
    <div class="flex flex-row justify-between items-center">
      <div class="text-sm font-semibold text-gray-800 dark:text-white">{{ vipText }}</div>
      <div class="flex flex-row items-center text-sm font-semibold text-gray-800 dark:text-white">
        Selanjutnya <IconArrowRight />
      </div>
      <div class="text-sm font-semibold text-gray-800 dark:text-white">{{ vipText2 }}</div>
    </div>

    <div class="w-full bg-gray-200 dark:bg-blue-950 rounded-full h-4 overflow-hidden">
      <div
        class="bg-green-300 dark:bg-white h-full transition-all duration-300"
        :style="{ width: progress + '%' }"
      ></div>
    </div>

    <div class="text-xs text-gray-600 dark:text-gray-300 text-center">
      {{ store.totalActiveUser }} dari {{ targetMap[store.vip] }} anggota aktif
    </div>

    <!-- Tombol Arahkan ke /undangan -->
    <div class="flex justify-center">
      <RouterLink
        to="/undangan"
        class="mt-2 inline-block bg-white dark:bg-gray-700 text-blue-800 dark:text-white px-4 py-2 rounded-lg shadow hover:bg-blue-100 dark:hover:bg-gray-600 transition"
      >
        Upgrade
      </RouterLink>
    </div>
  </div>
</template>
<script setup>
import { onMounted, computed } from 'vue'
import { useUserActiveDownline } from '@/stores/userActiveDownline'
import { IconArrowRight } from '@tabler/icons-vue'
const store = useUserActiveDownline()

onMounted(() => {
  store.fetchActiveDownline()
})

// Target masing-masing VIP
const targetMap = {
  1: 10,
  2: 30,
  3: 50,
  4: 51, // max
}

// Hitung progress berdasarkan totalActiveUser dan vip sekarang
const progress = computed(() => {
  const total = store.totalActiveUser
  const vip = store.vip
  const max = targetMap[vip] || 10
  const min = vip === 1 ? 0 : targetMap[vip - 1]

  const currentProgress = ((total - min) / (max - min)) * 100
  return Math.min(Math.max(currentProgress, 0), 100)
})

const vipText = computed(() => `VIP ${store.vip}`)
const vipText2 = computed(() => `VIP ${store.vip + 1}`)
</script>
