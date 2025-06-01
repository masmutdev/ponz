<template>
  <header
    :class="[
      'sticky top-0 z-50 flex justify-between items-center py-4 px-2 transition-all duration-300 shadow-md dark:shadow-[0_4px_6px_rgba(255,255,255,0.1)]',
      isScrolled ? 'bg-blue-800/80 backdrop-blur ' : 'bg-transparent',
      'dark:bg-blue-800/10',
    ]"
  >
    <div class="flex items-center gap-2">
      <template v-if="isRoot">
        <img :src="logo" alt="Logo" class="h-6 w-6" />
        <div class="flex items-center gap-1">
          <span
            :class="[
              'font-bold transition-colors duration-300',
              isScrolled
                ? 'text-white dark:text-yellow-500'
                : 'text-yellow-500 dark:text-yellow-500',
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
      </template>

      <template v-else>
        <button
          @click="goBack"
          :class="[
            'flex items-center gap-1 font-bold hover:underline transition-colors duration-300',
            isScrolled ? 'text-white dark:text-yellow-500' : 'text-blue-900 dark:text-yellow-500',
          ]"
        >
          <IconArrowLeft class="w-7 h-6" />
          <span>Kembali</span>
        </button>
      </template>
    </div>

    <!-- Kanan -->
    <div class="flex items-center gap-4 relative">
      <Notifikasi />
      <Profil />
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import logo from '@/assets/1/logo.png'
import Profil from '@/components/ui/walletpay/Profil.vue'
import Notifikasi from '@/components/ui/walletpay/Notifikasi.vue'
import { useRoute, useRouter } from 'vue-router'
import { IconArrowLeft } from '@tabler/icons-vue'

const route = useRoute()
const router = useRouter()

const isRoot = computed(() => route.path === '/')
const goBack = () => {
  if (window.history.length <= 1) {
    router.push('/')
  } else {
    router.back()
  }
}
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
