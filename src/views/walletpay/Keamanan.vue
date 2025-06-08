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
    <Alerts
      :message="alertMessage"
      :show="showAlert"
      :type="alertType"
      @close="showAlert = false"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserUpdatePassword } from '@/stores/userUpdatePassword'
import Alerts from '@/components/ui/walletpay/Alerts.vue'

const oldPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')

const passwordStore = useUserUpdatePassword()

const showAlert = ref(false)
const alertMessage = ref('')
const alertType = ref('success')

const showNotif = (msg, type = 'success') => {
  alertMessage.value = msg
  alertType.value = type
  showAlert.value = true
}

const gantiPassword = async () => {
  if (newPassword.value !== confirmPassword.value) {
    showNotif('Konfirmasi password tidak cocok', 'error')
    return
  }

  await passwordStore.updatePassword(oldPassword.value, newPassword.value, confirmPassword.value)

  if (passwordStore.error) {
    showNotif(passwordStore.error, 'error')
  } else {
    showNotif(passwordStore.success, 'success')

    oldPassword.value = ''
    newPassword.value = ''
    confirmPassword.value = ''
  }
}
</script>
