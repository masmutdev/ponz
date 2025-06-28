<template>
  <div class="max-w-md mx-auto mt-2 space-y-4 px-4">
    <!-- Tab Navigasi -->
    <div class="flex justify-between bg-gray-200 rounded-lg overflow-hidden text-sm font-semibold">
      <button
        class="w-1/2 py-2"
        :class="activeTab === 'pendek' ? 'bg-blue-500 text-white' : 'text-gray-700'"
        @click="activeTab = 'pendek'"
      >
        Jangka Pendek
      </button>
      <button
        class="w-1/2 py-2"
        :class="activeTab === 'panjang' ? 'bg-blue-500 text-white' : 'text-gray-700'"
        @click="activeTab = 'panjang'"
      >
        Jangka Panjang
      </button>
    </div>

    <!-- Daftar Investasi -->
    <div
      v-for="item in filteredInvestments"
      :key="item.kode_produk"
      class="dark:bg-gray-800 bg-white text-white rounded-xl overflow-hidden shadow p-3"
    >
      <!-- Header -->
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <img
            :src="gambarMap[item.gambar_produk]"
            :alt="item.nama_produk"
            class="h-16 w-16 rounded object-cover"
          />
          <div>
            <p class="text-sm text-blue-950 font-semibold">{{ item.nama_produk }}</p>
            <p class="text-sm text-[#f9a825] font-bold">${{ item.harga }}</p>
          </div>
        </div>
        <button
          :disabled="cekPesanan.isSudahDipesan(item.kode_produk)"
          @click="confirmStaking(item)"
          class="bg-gradient-to-r from-gray-300 to-blue-300 text-black px-3 py-1 rounded text-sm font-semibold flex items-center justify-center gap-2"
          :class="{
            'opacity-50 cursor-not-allowed': cekPesanan.isSudahDipesan(item.kode_produk),
            'cursor-pointer': !cekPesanan.isSudahDipesan(item.kode_produk),
          }"
        >
          <template v-if="cekPesanan.isSudahDipesan(item.kode_produk)">
            <svg
              class="animate-spin h-4 w-4 text-black"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              />
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
            Progress
          </template>
          <template v-else> Investasi </template>
        </button>
      </div>

      <!-- Info -->
      <div class="flex justify-between text-sm text-blue-950 mt-3 border-t border-gray-600 pt-2">
        <div>
          <p class="text-xs">Periode Validitas</p>
          <p class="font-medium">{{ item.durasi }} hari</p>
        </div>
        <div>
          <p class="text-xs">Penghasilan</p>
          <p class="font-medium">${{ item.profit_perhari }} / 24 jam</p>
        </div>
      </div>
    </div>

    <Alerts
      :message="alertMessage"
      :show="showAlert"
      :type="alertType"
      @close="showAlert = false"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Alerts from '@/components/ui/walletpay/Alerts.vue'
import { userSimpanPesanan2 } from '@/stores/userSimpanPesanan2'
import { useCekPesanan2 } from '@/stores/CekPesanan2'
import api from '@/lib/axios'

// Gambar
import nvidia from '@/assets/1/nvidia.jpeg'
import amd from '@/assets/1/amd.jpeg'
import docn from '@/assets/1/docn.jpeg'
import intc from '@/assets/1/intc.jpeg'
import wpx1 from '@/assets/1/wpx1.jpeg'
import wpx2 from '@/assets/1/wpx2.jpeg'
import wpx3 from '@/assets/1/wpx3.jpeg'

const gambarMap = {
  'nvidia.jpeg': nvidia,
  'amd.jpeg': amd,
  'docn.jpeg': docn,
  'intc.jpeg': intc,
  'wpx1.jpeg': wpx1,
  'wpx2.jpeg': wpx2,
  'wpx3.jpeg': wpx3,
}

// State
const investments = ref([])
const activeTab = ref('pendek')
const pesananStore = userSimpanPesanan2()
const cekPesanan = useCekPesanan2()

const alertMessage = ref('')
const alertType = ref('success')
const showAlert = ref(false)

// Alert handler
const showInfo = (msg, type = 'success') => {
  alertMessage.value = msg
  alertType.value = type
  showAlert.value = true
}

// Data produk
const fetchInvestments = () => {
  investments.value = [
    {
      kode_produk: 'NVIDIA',
      nama_produk: 'NVIDIA',
      harga: 5,
      durasi: 20,
      gambar_produk: 'nvidia.jpeg',
      profit_perhari: 0.5,
    },
    {
      kode_produk: 'AMD',
      nama_produk: 'AMD',
      harga: 10,
      durasi: 20,
      gambar_produk: 'amd.jpeg',
      profit_perhari: 1.0,
    },
    {
      kode_produk: 'DOCN',
      nama_produk: 'DOCN',
      harga: 20,
      durasi: 20,
      gambar_produk: 'docn.jpeg',
      profit_perhari: 1.4,
    },
    {
      kode_produk: 'INTC',
      nama_produk: 'INTC',
      harga: 30,
      durasi: 20,
      gambar_produk: 'intc.jpeg',
      profit_perhari: 2.2,
    },
    {
      kode_produk: 'WPX1',
      nama_produk: 'WP Business X-1',
      harga: 7,
      durasi: 5,
      gambar_produk: 'wpx1.jpeg',
      profit_perhari: 0.4,
    },
    {
      kode_produk: 'WPX2',
      nama_produk: 'WP Business X-2',
      harga: 15,
      durasi: 8,
      gambar_produk: 'wpx2.jpeg',
      profit_perhari: 0.5,
    },
    {
      kode_produk: 'WPX3',
      nama_produk: 'WP Business X-3',
      harga: 30,
      durasi: 10,
      gambar_produk: 'wpx3.jpeg',
      profit_perhari: 0.5,
    },
  ]
}

// Filter investasi sesuai tab
const filteredInvestments = computed(() => {
  if (activeTab.value === 'pendek') {
    return investments.value.filter((item) => ['WPX1', 'WPX2', 'WPX3'].includes(item.kode_produk))
  } else {
    return investments.value.filter((item) => !['WPX1', 'WPX2', 'WPX3'].includes(item.kode_produk))
  }
})

// Staking action
const confirmStaking = async (item) => {
  await pesananStore.simpanPesanan({ kode_produk: item.kode_produk })

  if (pesananStore.error) {
    showInfo(pesananStore.error, 'error')
  } else {
    showInfo(pesananStore.successMessage, 'success')
  }
}

onMounted(() => {
  fetchInvestments()
  cekPesanan.fetchPesanan()
})
</script>
