<template>
  <div class="mt-1 relative rounded-lg overflow-hidden shadow-md w-full max-w-md">
    <div
      class="absolute inset-0 bg-[url('@/assets/1/wave.jpg')] bg-cover bg-center mix-blend-overlay opacity-40 z-11"
    ></div>
    <div
      class="absolute inset-0 bg-[url('@/assets/1/wave2.png')] bg-cover bg-center mix-blend-soft-light z-12"
    ></div>
    <div class="absolute inset-0 bg-blue-500/70 dark:bg-blue-950/80 backdrop-blur-sm z-10"></div>
    <div class="relative z-12 flex justify-between items-center gap-2 p-4">
      <div class="flex justify-start items-center">
        <img :src="logo" alt="Logo" class="h-6 w-6" />
        <div class="flex items-center gap-1 ml-2">
          <span class="font-bold text-blue-950 dark:text-white duration-300"> WALLET </span>
          <span class="font-bold text-blue-950 dark:text-white duration-300"> PAY </span>
        </div>
      </div>
      <div class="flex justify-start items-center">
        <img :src="qr" alt="QR" class="h-6 w-6 dark:invert invert-0" />
      </div>
    </div>
    <div class="relative z-20 py-2 text-white">
      <div class="flex flex-row justify-between items-center px-4">
        <div class="flex flex-col justify-start items-start">
          <h2 class="text-sm text-blue-950 dark:text-white font-semibold">Admin WalletPay</h2>
          <h2 class="text-sm text-blue-950 dark:text-white font-semibold">081234567890</h2>
        </div>
        <div class="flex flex-col justify-start items-start">
          <h2 class="text-sm text-blue-950 dark:text-white font-semibold">SALDO</h2>
          <h2 class="text-sm text-blue-950 dark:text-white font-semibold">Rp. 10.000.000</h2>
        </div>
      </div>

      <!-- Garis pembatas -->
      <div class="border-t border-blue-950 dark:border-white my-4"></div>

      <!-- Tombol aksi -->
      <div class="flex justify-between gap-4 px-4">
        <button
          class="flex-1 bg-white/50 text-blue-950 font-semibold py-2 rounded-md hover:bg-blue-100 transition shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
        >
          Deposit
        </button>
        <button
          class="flex-1 bg-white/50 text-blue-950 font-semibold py-2 rounded-md hover:bg-blue-100 transition shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
        >
          Withdraw
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import logo from '@/assets/1/logo.png'
import qr from '@/assets/1/qr-code.png'
</script>
