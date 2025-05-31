<template>
  <div class="relative w-7 h-6">
    <img :src="bell" alt="Notifikasi" class="h-6 w-7" />
    <span class="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500">
      <span
        class="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75 animate-ping"
      ></span>
    </span>
  </div>
</template>

<script setup>
import bell from '@/assets/1/bell.png'
</script>
