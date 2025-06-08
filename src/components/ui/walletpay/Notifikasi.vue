<template>
  <router-link to="/notifikasi" class="relative w-7 h-6 block">
    <img :src="bell" alt="Notifikasi" class="h-6 w-7" />
    <span
      v-if="totalNotifikasi > 0"
      class="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"
    >
      <span
        class="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75 animate-ping"
      ></span>
    </span>
  </router-link>
</template>

<script setup>
import { computed, watch } from 'vue'
import bell from '@/assets/1/bell.png'
import { userNotifikasi } from '@/stores/userNotifikasi'
import { useRoute } from 'vue-router'

const route = useRoute()

watch(
  () => route.fullPath,
  () => {
    notifikasiStore.fetchNotifikasi()
  },
)

const notifikasiStore = userNotifikasi()

const totalNotifikasi = computed(() => notifikasiStore.data.length)
</script>
