<template>
  <div class="max-w-md mx-auto mt-2 space-y-6 px-4">
    <!-- Informasi VIP -->
    <div class="bg-blue-100 dark:bg-gray-800 p-4 rounded-lg shadow space-y-2 text-sm">
      <h3 class="text-md font-semibold text-gray-800 dark:text-white">📣 Program VIP Staking</h3>
      <ul class="text-gray-700 dark:text-gray-300 space-y-1">
        <li>VIP-1 → 1.0% /hari</li>
        <li>VIP-2 → 2.5% /hari</li>
        <li>VIP-3 → 4.5% /hari</li>
        <li>VIP-4 → 6.5% /hari</li>
      </ul>
      <p class="mt-2 text-xs text-gray-600 dark:text-gray-400">Minimum $15 — Maksimum $150</p>
    </div>

    <!-- Card koin -->
    <div
      v-for="coin in coins"
      :key="coin.id"
      class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow space-y-3"
    >
      <div class="flex items-center gap-3">
        <img :src="coin.icon" :alt="coin.name" class="h-8 w-8 rounded-full" />
        <div>
          <p class="font-semibold text-gray-800 dark:text-white">
            {{ coin.name }} ({{ coin.symbol }})
          </p>
          <p
            class="text-sm font-semibold"
            :class="coin.change.startsWith('+') ? 'text-green-500' : 'text-red-500'"
          >
            Quote Change: {{ coin.change }}
          </p>
          <p class="text-sm text-gray-600 dark:text-gray-400">Volume: {{ coin.volume }}</p>
        </div>
      </div>

      <button
        class="w-full mt-2 bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
        @click="openModal(coin)"
      >
        Mulai Staking {{ coin.symbol }}
      </button>
    </div>

    <!-- Modal -->
    <transition name="modal">
      <teleport to="body">
        <div
          v-if="modalOpen"
          class="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center z-50"
        >
          <div class="bg-white dark:bg-gray-800 rounded-lg w-11/12 max-w-md p-6 relative z-50">
            <button
              class="absolute top-3 right-3 text-gray-600 dark:text-gray-300"
              @click="closeModal"
            >
              ✕
            </button>

            <h2 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Staking {{ selected.coin.symbol }}
            </h2>

            <label class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              >Durasi</label
            >
            <select
              v-model="form.duration"
              class="w-full p-2 mb-4 border rounded-md bg-white dark:bg-gray-700 dark:text-white"
            >
              <option v-for="d in durations" :key="d" :value="d">{{ d }} Hari</option>
            </select>
            <span
              class="absolute right-12 top-[105px] inline-block bg-yellow-100 text-yellow-800 text-xs font-bold px-6 py-1 rounded-full dark:bg-blue-700 dark:text-yellow-300"
            >
              VIP {{ vipLevel }}
            </span>

            <label class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              >Jumlah Investasi</label
            >
            <input
              type="number"
              v-model.number="form.amount"
              class="w-full p-2 mb-2 border rounded-md bg-white dark:bg-gray-700 dark:text-white"
              placeholder="Minimum 15"
            />
            <div class="flex flex-row justify-between items-center mb-4">
              <span class="text-xs text-red-500 dark:text-red-400" v-if="!canSubmit"
                >Minimal $15</span
              >
              <p class="text-xs text-gray-500 dark:text-gray-400">Saldo tersedia: ${{ saldo }}</p>
            </div>

            <p class="font-medium text-gray-800 dark:text-white mb-2">Simulasi Pendapatan:</p>

            <div class="flex flex-col justify-center text-sm text-gray-800 dark:text-white">
              <div class="flex flex-row justify-between border-b border-gray-200 py-3">
                <span class="font-semibold">Profit Per Hari</span>
                <span>${{ dailyProfit.toFixed(2) }}</span>
              </div>
              <div class="flex flex-row justify-between border-b border-gray-200 py-3">
                <span class="font-semibold">Durasi</span>
                <span>{{ form.duration }} Hari</span>
              </div>
              <div class="flex flex-row justify-between border-b border-gray-200 py-3">
                <span class="font-semibold">Total Pendapatan</span>
                <span>${{ totalPendapatan.toFixed(2) }}</span>
              </div>
            </div>

            <button
              class="w-full mt-4 text-white py-2 rounded transition flex items-center justify-center gap-2"
              :class="[
                canSubmit ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-900 cursor-not-allowed',
              ]"
              :disabled="!canSubmit"
              @click="confirmStaking"
            >
              <span>Konfirmasi Staking</span>
            </button>
          </div>
        </div>
      </teleport>
    </transition>

    <Alerts
      :message="alertMessage"
      :show="showAlert"
      :type="alertType"
      @close="showAlert = false"
    />
  </div>
</template>

<script setup>
import { reactive, ref, computed, onMounted } from 'vue'
import usdt from '@/assets/1/usdt.png'
import btc from '@/assets/1/btc.png'
import eth from '@/assets/1/eth.png'
import sol from '@/assets/1/sol.png'
import doge from '@/assets/1/doge.png'
import { useUserActiveDownline } from '@/stores/userActiveDownline'
import Alerts from '@/components/ui/walletpay/Alerts.vue'
import { userSimpanPesanan } from '@/stores/userSimpanPesanan'
const pesananStore = userSimpanPesanan()

const alertMessage = ref('')
const alertType = ref('success')
const showAlert = ref(false)

const showInfo = (msg, type = 'success') => {
  alertMessage.value = msg
  alertType.value = type
  showAlert.value = true
}

const saldo = ref(1000) // contoh saldo

const coins = reactive([
  { id: 1, name: 'Tether', symbol: 'USDT', icon: usdt, volume: '$67.89B', change: '+0.02%' },
  { id: 2, name: 'Bitcoin', symbol: 'BTC', icon: btc, volume: '$45.31B', change: '+2.14%' },
  { id: 3, name: 'Ethereum', symbol: 'ETH', icon: eth, volume: '$23.42B', change: '+1.82%' },
  { id: 4, name: 'Solana', symbol: 'SOL', icon: sol, volume: '$3.48B', change: '-0.34%' },
  { id: 5, name: 'Dogecoin', symbol: 'DOGE', icon: doge, volume: '$1.81B', change: '+0.95%' },
])

const userActive = useUserActiveDownline()

onMounted(() => {
  userActive.fetchActiveDownline()
})

const vipLevel = computed(() => userActive.vip)

const vipRateMap = {
  1: 0.01,
  2: 0.025,
  3: 0.045,
  4: 0.065,
}

const durations = computed(() => {
  const map = {
    1: [15],
    2: [30],
    3: [90],
    4: [120],
  }
  return map[vipLevel.value] || []
})

const modalOpen = ref(false)
const selected = reactive({ coin: null, id: null })
const form = reactive({ duration: 15, amount: null })

const openModal = (coin) => {
  selected.coin = coin
  selected.id = coin.id
  form.duration = durations.value[0] // <- ambil durasi sesuai VIP
  form.amount = null
  modalOpen.value = true
}

const closeModal = () => (modalOpen.value = false)

const canSubmit = computed(() => form.amount >= 15 && form.amount <= saldo.value)

const dailyProfit = computed(() => {
  const rate = vipRateMap[vipLevel.value] || 0
  return form.amount ? form.amount * rate : 0
})

const totalPendapatan = computed(() => {
  return form.amount ? dailyProfit.value * form.duration + form.amount : 0
})
const dailyRates = { 15: 0.01, 30: 0.025, 90: 0.045, 120: 0.065 }

const estimated = computed(() => {
  const rate = dailyRates[form.duration] || 0
  return form.amount ? form.amount * rate * form.duration : 0
})

const confirmStaking = async () => {
  await pesananStore.simpanPesanan({
    kode_produk: selected.coin.symbol,
    harga: form.amount,
  })

  if (pesananStore.error) {
    showInfo(pesananStore.error, 'error')
  } else {
    showInfo(pesananStore.successMessage, 'success')
    closeModal()
  }
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
