<template>
  <div class="relative min-h-screen flex flex-col mx-auto max-w-md bg-white dark:bg-transparent">
    <div class="absolute inset-0 bg-white dark:bg-black/60 pointer-events-none z-[1]"></div>
    <Navbar />

    <main class="flex-1 my-4 px-4 relative z-10">
      <slot />
    </main>

    <Footer />
  </div>
</template>

<script setup>
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'

import { onMounted } from 'vue'
import { userNotifikasi } from '@/stores/userNotifikasi'

const notifikasiStore = userNotifikasi()

onMounted(() => {
  notifikasiStore.fetchNotifikasi()
})
</script>
