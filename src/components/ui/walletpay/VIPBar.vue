<template>
  <div
    class="max-w-md mx-auto bg-blue-300 text-blue-800 dark:bg-blue-900 dark:text-white p-4 rounded-lg shadow space-y-2"
  >
    <div class="text-sm font-semibold text-gray-800 dark:text-white">VIP 1</div>

    <div class="w-full bg-gray-200 dark:bg-blue-950 rounded-full h-4 overflow-hidden">
      <div
        class="bg-blue-600 dark:bg-white h-full transition-all duration-300"
        :style="{ width: progress + '%' }"
      ></div>
    </div>

    <div class="text-xs text-gray-600 dark:text-gray-300 text-center">0 - 10 Anggota Aktif</div>
  </div>
</template>
<script setup>
const progress = 40 // dalam persen, bisa diganti sesuai jumlah anggota aktif
</script>
