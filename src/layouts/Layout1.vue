<template>
  <div class="min-h-screen flex flex-col mx-auto max-w-md px-4 bg-white dark:bg-gray-900">
    <Navbar />

    <main class="flex-1 my-4">
      <slot />
    </main>

    <Footer />
  </div>
</template>

<script setup>
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'
</script>
