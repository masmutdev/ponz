<template>
  <header
    class="sticky top-0 z-50 bg-white dark:bg-gray-900 flex justify-between items-center py-4 border-b px-2"
  >
    <!-- Kiri -->
    <div class="flex items-center gap-2">
      <img :src="logo" alt="Logo" class="h-6 w-6" />
      <span class="text-blue-950 font-bold">WALLET PAY</span>
    </div>

    <!-- Kanan -->
    <div class="flex items-center gap-4 relative">
      <img :src="bell" alt="Notifikasi" class="h-5 w-5" />

      <!-- Icon User -->
      <img
        :src="user"
        alt="User"
        class="h-6 w-6 rounded-full cursor-pointer"
        @click="toggleDropdown"
        ref="userIconRef"
      />

      <!-- Dropdown -->
      <div
        v-if="dropdownOpen"
        ref="dropdownRef"
        class="absolute top-10 right-0 bg-white dark:bg-gray-800 border rounded shadow-lg p-4 w-52 z-50 space-y-3 text-black dark:text-white"
      >
        <div class="font-medium">Akun Saya</div>

        <!-- Bahasa -->
        <div class="flex items-center justify-between">
          <span class="text-sm font-medium">Bahasa:</span>
          <div class="relative">
            <div
              @click="langDropdown = !langDropdown"
              class="cursor-pointer flex items-center gap-2 border px-2 py-1 rounded"
            >
              <img :src="selectedLang === 'id' ? idFlag : usFlag" alt="Lang" class="h-4 w-4" />
              <span class="text-xs uppercase">{{ selectedLang }}</span>
            </div>
            <div
              v-if="langDropdown"
              class="absolute right-0 mt-1 bg-white border rounded shadow z-10 w-24"
            >
              <div
                @click="selectLang('id')"
                class="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 cursor-pointer"
              >
                <img :src="idFlag" alt="ID" class="h-4 w-4" />
                <span class="text-xs">ID</span>
              </div>
              <div
                @click="selectLang('en')"
                class="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 cursor-pointer"
              >
                <img :src="usFlag" alt="EN" class="h-4 w-4" />
                <span class="text-xs">EN</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Darkmode -->
        <div class="flex justify-between items-center">
          <span
            class="flex items-center text-sm font-medium transition-colors duration-300 ease-in-out"
          >
            {{ darkMode ? 'Dark Mode' : 'Light Mode' }}
            <component
              :is="darkMode ? IconMoon : IconSun"
              class="ml-1 w-5 h-5 text-blue-800 transition-transform duration-300 ease-in-out"
            />
          </span>

          <div class="flex items-center gap-2">
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="darkMode" class="sr-only peer" />
              <div
                class="w-11 h-6 bg-gray-300 peer-checked:bg-blue-600 rounded-full transition-colors duration-300 ease-in-out"
              ></div>
              <div
                class="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ease-in-out peer-checked:translate-x-5"
              ></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import logo from '@/assets/1/logo.svg'
import bell from '@/assets/1/bell.png'
import user from '@/assets/1/user.png'
import idFlag from '@/assets/1/id.png'
import usFlag from '@/assets/1/us.png'
import { IconSun, IconMoon } from '@tabler/icons-vue'

const dropdownOpen = ref(false)
const langDropdown = ref(false)
const selectedLang = ref('id')
const darkMode = ref(false)

const dropdownRef = ref(null)
const userIconRef = ref(null)

const selectLang = (lang) => {
  selectedLang.value = lang
  langDropdown.value = false
}

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
    langDropdown.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  const saved = localStorage.getItem('darkMode')
  darkMode.value = saved === 'true'
  updateHtmlClass()
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})

watch(darkMode, (val) => {
  localStorage.setItem('darkMode', val.toString())
  updateHtmlClass()
})

const updateHtmlClass = () => {
  document.documentElement.classList.toggle('dark', darkMode.value)
}
</script>
