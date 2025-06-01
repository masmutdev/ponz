<template>
  <div class="flex justify-between items-center">
    <span class="flex items-center text-sm font-medium">
      {{ darkMode ? 'Dark Mode' : 'Light Mode' }}
      <component :is="darkMode ? IconMoon : IconSun" class="ml-1 w-5 h-5 text-blue-800" />
    </span>
    <label class="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" v-model="darkMode" class="sr-only peer" />
      <div class="w-11 h-6 bg-gray-300 peer-checked:bg-blue-600 rounded-full"></div>
      <div
        class="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ease-in-out peer-checked:translate-x-5"
      ></div>
    </label>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { IconSun, IconMoon } from '@tabler/icons-vue'

const darkMode = ref(false)

onMounted(() => {
  const saved = localStorage.getItem('darkMode')
  darkMode.value = saved === 'true'
  updateHtmlClass()
})

watch(darkMode, (val) => {
  localStorage.setItem('darkMode', val.toString())
  updateHtmlClass()
})

const updateHtmlClass = () => {
  document.documentElement.classList.toggle('dark', darkMode.value)
}
</script>
