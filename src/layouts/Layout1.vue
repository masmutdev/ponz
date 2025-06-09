<template>
  <div class="relative min-h-screen flex flex-col mx-auto max-w-md bg-white dark:bg-transparent">
    <div class="absolute inset-0 bg-white dark:bg-black/60 pointer-events-none z-[1]"></div>
    <Navbar />

    <main class="flex-1 my-4 px-4 relative z-10">
      <slot />
    </main>

    <!-- Floating CS Icon -->
    <div
      ref="csIcon"
      class="fixed z-50 bottom-[100px] right-4 cursor-pointer rounded-full overflow-hidden shadow-lg"
      style="width: 56px; height: 56px"
      @mousedown="startDrag"
    >
      <a href="https://t.me/+r-HIfxiiTGE4MjQ1" target="_blank" rel="noopener noreferrer">
        <img src="@/assets/1/support.jpeg" alt="CS" class="w-full h-full object-cover" />
      </a>
    </div>

    <Footer />
  </div>
</template>

<script setup>
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'

import { onMounted, ref } from 'vue'
import { userNotifikasi } from '@/stores/userNotifikasi'

const notifikasiStore = userNotifikasi()

onMounted(() => {
  notifikasiStore.fetchNotifikasi()
})

const csIcon = ref(null)

let isDragging = false
let offset = { x: 0, y: 0 }

const startDrag = (e) => {
  isDragging = true
  const clientX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX
  const clientY = e.type.startsWith('touch') ? e.touches[0].clientY : e.clientY

  offset.x = clientX - csIcon.value.getBoundingClientRect().left
  offset.y = clientY - csIcon.value.getBoundingClientRect().top

  document.addEventListener('mousemove', onDrag)
  document.addEventListener('mouseup', stopDrag)
  document.addEventListener('touchmove', onDrag)
  document.addEventListener('touchend', stopDrag)
}

const onDrag = (e) => {
  if (!isDragging) return

  const clientX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX
  const clientY = e.type.startsWith('touch') ? e.touches[0].clientY : e.clientY

  const x = clientX - offset.x
  const y = clientY - offset.y

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
