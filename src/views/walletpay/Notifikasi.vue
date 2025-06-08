<template>
  <div class="max-w-md mx-auto mt-2 space-y-4">
    <h2 class="text-xl font-bold text-gray-800 dark:text-white text-center">Notifikasi</h2>

    <div v-if="notifikasiStore.loading" class="text-center text-gray-500">Memuat notifikasi...</div>
    <div v-else-if="notifikasi.length === 0" class="text-center text-gray-500">
      Tidak ada notifikasi.
    </div>

    <div
      v-else
      v-for="(notif, i) in notifikasi"
      :key="i"
      class="p-4 rounded-lg shadow bg-blue-100 dark:bg-gray-800 text-sm text-gray-800 dark:text-white"
    >
      <p class="font-semibold">{{ notif.judul }}</p>
      <p class="text-xs text-gray-600 dark:text-gray-300">{{ notif.tanggal }}</p>
      <p class="mt-1">{{ notif.pesan }}</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { userUpdateNotifikasi } from '@/stores/userUpdateNotifikasi'

const notifikasiStore = userUpdateNotifikasi()

onMounted(() => {
  notifikasiStore.updateDanAmbilNotifikasi()
})

const notifikasi = computed(() => notifikasiStore.data)
</script>
