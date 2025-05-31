<template>
  <header
    :class="[
      'sticky top-0 z-50 flex justify-between items-center py-4 px-2 transition-all duration-300 shadow-md dark:shadow-[0_4px_6px_rgba(255,255,255,0.1)]',
      isScrolled ? 'bg-blue-800/80 backdrop-blur ' : 'bg-transparent',
      'dark:bg-blue-800/10',
    ]"
  >
    <!-- Kiri -->
    <div class="flex items-center gap-2">
      <img :src="logo" alt="Logo" class="h-6 w-6" />
      <div class="flex items-center gap-1">
        <span
          :class="[
            'font-bold transition-colors duration-300',
            isScrolled ? 'text-white dark:text-yellow-500' : 'text-yellow-500 dark:text-yellow-500',
          ]"
        >
          WALLET
        </span>
        <span
          :class="[
            'font-bold transition-colors duration-300',
            isScrolled ? 'text-blue-950 dark:text-white' : 'text-blue-950 dark:text-white',
          ]"
        >
          PAY
        </span>
      </div>
    </div>

    <!-- Kanan -->
    <div class="flex items-center gap-4 relative">
      <Notifikasi />
      <Profil />
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import logo from '@/assets/1/logo.png'
import Profil from '@/components/ui/Profil.vue'
import Notifikasi from '@/components/ui/Notifikasi.vue'

const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 10
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
