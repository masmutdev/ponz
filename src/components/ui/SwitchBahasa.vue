<template>
  <div class="flex items-center justify-between">
    <span class="text-sm font-medium">Bahasa:</span>
    <div class="relative">
      <div
        @click="toggleDropdown"
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
</template>

<script setup>
import { ref } from 'vue'
import idFlag from '@/assets/1/id.png'
import usFlag from '@/assets/1/us.png'

const selectedLang = ref('id')
const langDropdown = ref(false)

const toggleDropdown = () => {
  langDropdown.value = !langDropdown.value
}

const selectLang = (lang) => {
  selectedLang.value = lang
  langDropdown.value = false
}
</script>
