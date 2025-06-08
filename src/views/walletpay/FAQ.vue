<template>
  <div class="max-w-2xl mx-auto mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow space-y-4">
    <h2 class="text-lg font-bold text-center text-gray-800 dark:text-white">
      FAQ - Pay Business Wallet
    </h2>

    <div
      v-for="(item, index) in faqList"
      :key="index"
      class="border-b border-gray-200 dark:border-gray-700"
    >
      <button
        @click="toggle(index)"
        class="w-full text-left py-3 flex justify-between items-center text-sm font-medium text-gray-800 dark:text-white"
      >
        {{ index + 1 }}. {{ item.q }}
        <span class="text-xl">{{ openIndex === index ? '−' : '+' }}</span>
      </button>
      <div v-if="openIndex === index" class="pb-3 text-sm text-gray-600 dark:text-gray-300">
        {{ item.a }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const openIndex = ref(null)

const toggle = (index) => {
  openIndex.value = openIndex.value === index ? null : index
}

const faqList = [
  {
    q: 'Apa itu Pay Business Wallet?',
    a: 'Pay Business Wallet adalah dompet digital cerdas yang mendukung transaksi bisnis, penyimpanan aset kripto, dan sistem staking berbasis blockchain.',
  },
  {
    q: 'Apa yang dimaksud dengan staking di Pay Business Wallet?',
    a: 'Staking adalah proses mengunci aset kripto Anda dalam jaringan blockchain untuk mendapatkan imbal hasil. Di Pay Business Wallet, proses ini dibantu AI.',
  },
  {
    q: 'Bagaimana cara kerja AI dalam dompet ini?',
    a: 'AI menganalisis perilaku Anda dan pasar kripto, lalu memberi rekomendasi serta automasi staking dan portofolio.',
  },
  {
    q: 'Apakah dompet ini mendukung berbagai jenis cryptocurrency?',
    a: 'Saat ini ada 4 cryptocurrency yang didukung, termasuk BTC, ETH, SOL, dan DOGE. Cryptocurrency lainnya akan menyusul seiring update dari sistem kami',
  },
  {
    q: 'Apakah hasil staking dijamin?',
    a: 'Tidak. Imbal hasil tergantung protokol blockchain, namun AI membantu optimasi dengan risiko minimal.',
  },
  {
    q: 'Bagaimana keamanan dompet ini?',
    a: 'Menggunakan enkripsi, 2FA, AI untuk deteksi anomali, cold wallet, dan smart contract yang diaudit.',
  },
  {
    q: 'Berapa biaya untuk menggunakan fitur staking dan AI?',
    a: 'Gratis, jika anda melakukan staking. AI kami akan melakukan otomatisasi untuk menganalisa pasar secara akurat',
  },
  {
    q: 'Bisakah saya menarik dana kapan saja?',
    a: 'Tidak, waktu penarikan tergantung anda memilih durasi staking antara 15 - 120 hari. Atau jika anda sudah memenuhi minimal $5 maka anda bisa langsung mengajukan penarikan',
  },
  {
    q: 'Apakah dompet ini cocok untuk bisnis?',
    a: 'Sangat cocok. Bisa terima pembayaran kripto, kelola arus kas, dan gunakan analitik AI.',
  },
  {
    q: 'Bagaimana jika saya pemula dalam dunia kripto dan AI?',
    a: 'Tenang, ada AI kami yang bantu Anda mulai dengan aman.',
  },
]
</script>
