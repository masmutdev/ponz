<template>
  <div class="relative min-h-screen flex flex-col mx-auto max-w-md bg-white dark:bg-transparent">
    <div class="absolute inset-0 bg-white dark:bg-black/60 pointer-events-none z-[1]"></div>
    <Navbar />

    <main class="flex-1 my-4 px-4 relative z-10">
      <slot />
    </main>

    <!-- Floating CS Icon -->
    <div
      v-if="!isDetailDeposit"
      ref="csIcon"
      class="fixed z-50 bottom-[100px] right-4 cursor-pointer rounded-full overflow-hidden shadow-lg touch-none"
      style="width: 56px; height: 56px"
      @mousedown="startDrag"
      @touchstart="startDrag"
    >
      <a href="https://t.me/+r-HIfxiiTGE4MjQ1" target="_blank" rel="noopener noreferrer">
        <img src="@/assets/1/support.jpeg" alt="CS" class="w-full h-full object-cover" />
      </a>
    </div>

    <!-- Footer -->
    <Footer v-if="!isDetailDeposit" />
  </div>
</template>

<script setup>
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'

import { onMounted, ref, computed } from 'vue'
import { userNotifikasi } from '@/stores/userNotifikasi'
import { useRoute } from 'vue-router'

const route = useRoute()
const isDetailDeposit = computed(() => {
  return route.path === '/detail-deposit' && route.query.invoice && route.query.order_id
})

const notifikasiStore = userNotifikasi()

onMounted(() => {
  notifikasiStore.fetchNotifikasi()
})

const csIcon = ref(null)

let isDragging = false
let offset = { x: 0, y: 0 }

const startDrag = (e) => {
  isDragging = true

  const point = e.type.startsWith('touch') ? e.touches[0] : e
  offset.x = point.clientX - csIcon.value.getBoundingClientRect().left
  offset.y = point.clientY - csIcon.value.getBoundingClientRect().top

  document.addEventListener('mousemove', onDrag)
  document.addEventListener('mouseup', stopDrag)
  document.addEventListener('touchmove', onDrag, { passive: false })
  document.addEventListener('touchend', stopDrag)
}

const onDrag = (e) => {
  if (!isDragging) return
  if (e.cancelable) e.preventDefault()

  const point = e.type.startsWith('touch') ? e.touches[0] : e
  const x = point.clientX - offset.x
  const y = point.clientY - offset.y

  csIcon.value.style.left = `${x}px`
  csIcon.value.style.top = `${y}px`
  csIcon.value.style.right = 'auto'
  csIcon.value.style.bottom = 'auto'
  csIcon.value.style.position = 'fixed'
}

const stopDrag = () => {
  isDragging = false
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
  document.removeEventListener('touchmove', onDrag)
  document.removeEventListener('touchend', stopDrag)
}
</script>
