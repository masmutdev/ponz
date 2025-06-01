<template>
  <div class="max-w-md mx-auto mt-2 space-y-4">
    <h2 class="text-xl font-bold text-gray-800 dark:text-white text-center">Notifikasi</h2>

    <div
      v-for="(notif, i) in notifikasi"
      :key="i"
      class="p-4 rounded-lg shadow bg-blue-100 dark:bg-gray-800 text-sm text-gray-800 dark:text-white"
    >
      <p class="font-semibold">{{ notif.judul }}</p>
      <p class="text-xs text-gray-600 dark:text-gray-300">{{ notif.tanggal }}</p>
      <p class="mt-1">{{ notif.pesan }}</p>
    </div>
  </div>
</template>

<script setup>
const notifikasi = [
  {
    judul: 'Deposit Berhasil',
    pesan: 'Rp. 1.000.000 telah berhasil didepositkan ke akun Anda.',
    tanggal: '31 Mei 2025, 10:45 WIB',
  },
  {
    judul: 'Withdraw Diproses',
    pesan: 'Permintaan withdraw Anda sedang diproses.',
    tanggal: '30 Mei 2025, 16:12 WIB',
  },
  {
    judul: 'Promo Baru!',
    pesan: 'Dapatkan bonus 10% untuk setiap deposit di bulan Juni.',
    tanggal: '29 Mei 2025, 09:00 WIB',
  },
]
</script>
