<template>
  <Teleport to="body">
    <div v-if="visible" class="fixed inset-0 flex items-center justify-center z-50">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black/30" @click="close" />

      <!-- Modal -->
      <div
        class="relative z-10 bg-black/70 text-white p-6 rounded-lg text-center max-w-[280px] w-full"
      >
        <IconXboxX class="mx-auto w-8 h-8 mb-3" />
        <p class="text-sm">{{ message }}</p>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { IconXboxX } from '@tabler/icons-vue'

const props = defineProps<{
  message: string
  show: boolean
}>()

const emit = defineEmits(['close'])

const visible = ref(props.show)

const close = () => {
  visible.value = false
  emit('close')
}

// Auto close after 3 seconds
watchEffect(() => {
  if (props.show) {
    visible.value = true
    setTimeout(() => {
      close()
    }, 3000)
  }
})
</script>
