<template>
  <div>
    <!-- Icon Menu -->
    <IconMenu2 class="w-6 h-6 cursor-pointer text-gray-900 dark:text-white" @click="openMenu" />

    <!-- Backdrop -->
    <transition name="fade">
      <div v-if="menuOpen" class="fixed inset-0 bg-black/30 z-40" @click.self="closeMenu"></div>
    </transition>

    <!-- Offcanvas -->
    <transition name="slide">
      <div
        v-if="menuOpen"
        class="fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 shadow-lg z-50 p-4"
      >
        <!-- Close button -->
        <div class="flex justify-end">
          <IconX class="w-6 h-6 cursor-pointer text-gray-900 dark:text-white" @click="closeMenu" />
        </div>
        <!-- Isi menu -->
        <div class="mt-4 space-y-4">
          <div class="text-black dark:text-white">Menu 1</div>
          <div class="text-black dark:text-white">Menu 2</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { IconMenu2, IconX } from '@tabler/icons-vue'

const menuOpen = ref(false)
const openMenu = () => (menuOpen.value = true)
const closeMenu = () => (menuOpen.value = false)
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s;
}
.slide-enter-from {
  transform: translateX(-100%);
}
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
