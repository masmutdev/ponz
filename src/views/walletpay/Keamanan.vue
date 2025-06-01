<template>
  <div class="max-w-md mx-auto mt-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow space-y-4">
    <h2 class="text-lg font-bold text-gray-800 dark:text-white text-center">Ganti Password</h2>

    <div class="space-y-2">
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >Password Lama</label
      >
      <input
        type="password"
        v-model="oldPassword"
        placeholder="Masukkan password lama"
        class="w-full p-2 border rounded-md bg-white text-black dark:bg-gray-700 dark:text-white focus:outline-none focus:ring focus:border-blue-500"
      />
    </div>

    <div class="space-y-2">
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >Password Baru</label
      >
      <input
        type="password"
        v-model="newPassword"
        placeholder="Masukkan password baru"
        class="w-full p-2 border rounded-md bg-white text-black dark:bg-gray-700 dark:text-white focus:outline-none focus:ring focus:border-blue-500"
      />
    </div>

    <div class="space-y-2">
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >Konfirmasi Password Baru</label
      >
      <input
        type="password"
        v-model="confirmPassword"
        placeholder="Ulangi password baru"
        class="w-full p-2 border rounded-md bg-white text-black dark:bg-gray-700 dark:text-white focus:outline-none focus:ring focus:border-blue-500"
      />
    </div>

    <button
      @click="gantiPassword"
      class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 dark:bg-blue-900 dark:hover:bg-blue-800 transition"
    >
      Simpan Password Baru
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const oldPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')

const gantiPassword = () => {
  if (newPassword.value !== confirmPassword.value) {
    alert('Konfirmasi password tidak cocok')
    return
  }

  console.log('Ganti password:', {
    oldPassword: oldPassword.value,
    newPassword: newPassword.value,
  })

  // Kirim ke backend untuk verifikasi dan update password
}
</script>
