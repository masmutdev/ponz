<template>
  <div v-if="authReady">
    <component :is="layoutComponent">
      <RouterView />
    </component>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Layout1 from '@/layouts/Layout1.vue'

const authReady = ref(false)
const route = useRoute()
const router = useRouter()

const layoutComponent = computed(() => {
  const noLayoutRoutes = ['/login', '/register']
  return noLayoutRoutes.includes(route.path) ? 'div' : Layout1
})

// Set ready setelah router resolve
router.isReady().then(() => {
  authReady.value = true
})
</script>
