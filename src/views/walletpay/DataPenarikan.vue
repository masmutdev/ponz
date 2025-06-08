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
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Nama Pemilik Rekening
      </label>
      <input
        type="text"
        v-model="pemilik"
        placeholder="Nama lengkap sesuai rekening"
        class="w-full p-2 border rounded-md bg-white text-black dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-500"
      />
    </div>

    <div class="space-y-2">
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Nomor Rekening
      </label>
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

    <Alerts
      :message="alertMessage"
      :show="showAlert"
      :type="alertType"
      @close="showAlert = false"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useUserDataRekening } from '@/stores/userDataRekening'
import { useUserUpdateRekening } from '@/stores/userUpdateRekening'
import Alerts from '@/components/ui/walletpay/Alerts.vue'

const rekeningStore = useUserDataRekening()
const updateStore = useUserUpdateRekening()

const bank = ref('')
const pemilik = ref('')
const rekening = ref('')

const alertMessage = ref('')
const alertType = ref('success')
const showAlert = ref(false)

const showInfo = (msg, type = 'success') => {
  alertMessage.value = msg
  alertType.value = type
  showAlert.value = true
}

onMounted(async () => {
  await rekeningStore.fetchRekening()

  bank.value = rekeningStore.data.bank
  pemilik.value = rekeningStore.data.pemilik
  rekening.value = rekeningStore.data.norek
})

const simpan = async () => {
  await updateStore.updateRekening({
    bank: bank.value,
    pemilik: pemilik.value,
    norek: rekening.value,
  })

  if (updateStore.error) {
    showInfo(updateStore.error, 'error')
  } else {
    showInfo(updateStore.success)
  }
}
</script>
