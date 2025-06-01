<template>
  <div class="max-w-md mx-auto mt-2 p-6 bg-white dark:bg-gray-800 rounded-lg shadow space-y-4">
    <h2 class="text-lg font-bold text-gray-800 dark:text-white text-center">
      Edit Informasi Penarikan
    </h2>

    <div class="space-y-2">
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nama Bank</label>
      <input
        type="text"
        v-model="bank"
        placeholder="Contoh: BCA, Mandiri, BRI"
        class="w-full p-2 border rounded-md bg-white text-black dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-500"
      />
    </div>

    <div class="space-y-2">
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >Nama Pemilik Rekening</label
      >
      <input
        type="text"
        v-model="pemilik"
        placeholder="Nama lengkap sesuai rekening"
        class="w-full p-2 border rounded-md bg-white text-black dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-500"
      />
    </div>

    <div class="space-y-2">
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >Nomor Rekening</label
      >
      <input
        type="text"
        v-model="rekening"
        placeholder="Masukkan nomor rekening"
        class="w-full p-2 border rounded-md bg-white text-black dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-500"
      />
    </div>

    <button
      @click="simpan"
      class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 dark:bg-blue-900 dark:hover:bg-blue-800 transition"
    >
      Simpan Perubahan
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const bank = ref('')
const pemilik = ref('')
const rekening = ref('')

const simpan = () => {
  console.log('Data disimpan:', {
    bank: bank.value,
    pemilik: pemilik.value,
    rekening: rekening.value,
  })

  // Bisa lanjutkan ke API PUT / PATCH ke backend
}
</script>
