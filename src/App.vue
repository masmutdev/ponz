<template>
  <Loader v-if="!authReady" />

  <component v-else :is="layoutComponent">
    <RouterView />
  </component>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Layout1 from '@/layouts/Layout1.vue'
import Loader from '@/components/ui/walletpay/Loader.vue'

const route = useRoute()
const authReady = ref(false)

const layoutComponent = computed(() => {
  const noLayoutNames = ['login', 'register', 'not-found']
  return noLayoutNames.includes(route.name as string) ? 'div' : Layout1
})

onMounted(() => {
  setTimeout(() => {
    authReady.value = true
  }, 300)
})
</script>
