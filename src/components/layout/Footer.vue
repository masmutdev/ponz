<template>
  <footer
    class="sticky bottom-0 z-20 bg-white dark:bg-gray-900 py-4 shadow-[0_-4px_6px_rgba(0,0,0,0.1)] dark:shadow-[0_-4px_6px_rgba(255,255,255,0.1)] text-center text-sm text-gray-500"
  >
    <nav class="flex justify-around">
      <RouterLink
        to="/"
        class="flex flex-col items-center text-gray-500 dark:text-white hover:text-blue-500"
      >
        <IconHome2 class="w-6 h-6" />
        <span>Home</span>
      </RouterLink>

      <RouterLink
        to="/crypto"
        class="flex flex-col items-center text-gray-500 dark:text-white hover:text-blue-500"
      >
        <IconCurrencyBitcoin class="w-6 h-6" />
        <span>Crypto</span>
      </RouterLink>

      <RouterLink
        to="/tim"
        class="flex flex-col items-center text-gray-500 dark:text-white hover:text-blue-500"
      >
        <IconUsers class="w-6 h-6" />
        <span>Tim</span>
      </RouterLink>

      <RouterLink
        to="/pengaturan"
        class="flex flex-col items-center text-gray-500 dark:text-white hover:text-blue-500"
      >
        <IconSettings class="w-6 h-6" />
        <span>Pengaturan</span>
      </RouterLink>
    </nav>
  </footer>
</template>
<script setup>
import { RouterLink } from 'vue-router'

import { IconHome2, IconCurrencyBitcoin, IconUsers, IconSettings } from '@tabler/icons-vue'
</script>
