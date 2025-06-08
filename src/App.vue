<template>
  <Loader v-if="!authReady" />

  <component v-else :is="layoutComponent">
    <Alerts
      :message="alertMessage"
      :show="showAlert"
      :type="alertType"
      @close="showAlert = false"
    />
    <RouterView />
  </component>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Layout1 from '@/layouts/Layout1.vue'
import Loader from '@/components/ui/walletpay/Loader.vue'
import Alerts from '@/components/ui/walletpay/Alerts.vue'

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

// Alert states
const alertMessage = ref('')
const showAlert = ref(false)
const alertType = ref<'success' | 'error' | undefined>()
</script>
