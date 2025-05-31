<template>
  <div class="relative">
    <img
      :src="user"
      alt="User"
      class="h-6 w-6 rounded-full cursor-pointer"
      @click="toggleDropdown"
      ref="userIconRef"
    />

    <div
      v-if="dropdownOpen"
      ref="dropdownRef"
      class="absolute top-10 right-0 bg-white dark:bg-gray-800 border rounded shadow-lg p-4 w-52 z-50 space-y-3 text-black dark:text-white"
    >
      <div class="font-medium">Akun Saya</div>
      <SwitchBahasa />
      <DarkMode />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import user from '@/assets/1/user.png'
import SwitchBahasa from '@/components/ui/SwitchBahasa.vue'
import DarkMode from '@/components/ui/DarkMode.vue'

const dropdownOpen = ref(false)
const dropdownRef = ref(null)
const userIconRef = ref(null)

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const handleClickOutside = (event) => {
  const target = event.target
  if (
    dropdownRef.value &&
    !dropdownRef.value.contains(target) &&
    userIconRef.value &&
    !userIconRef.value.contains(target)
  ) {
    dropdownOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
