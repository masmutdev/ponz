<template>
  <div class="max-w-md mx-auto mt-2 p-4 bg-white dark:bg-gray-800 rounded-lg shadow space-y-4">
    <h2 class="text-lg font-bold text-gray-800 dark:text-white text-center">
      Undang Teman & Dapatkan Bonus
    </h2>

    <div class="flex flex-col items-center gap-2">
      <img :src="qrSrc" alt="QR Code" class="h-28 w-28 dark:invert" ref="qrRef" />
      <p class="text-sm text-gray-700 dark:text-gray-300">Kode Referral Anda:</p>
      <p class="text-center text-sm text-blue-700 dark:text-blue-400 break-all">
        {{ fullReferralLink }}
      </p>
      <div class="flex gap-2 mt-2">
        <button
          @click="copyLink"
          class="text-xs px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
        >
          Salin Link
        </button>
        <button
          @click="downloadQR"
          class="text-xs px-3 py-1 rounded bg-gray-500 text-white hover:bg-gray-600"
        >
          Download QR
        </button>
      </div>
    </div>

    <div class="space-y-4 text-sm text-gray-700 dark:text-gray-300">
      <div class="border-t pt-4">
        🎖️ <strong>Program Bonus & Sistem Peringkat VIP</strong><br />
        <p class="mt-1">
          Tingkatkan peringkat VIP Anda dengan mengundang anggota aktif dan nikmati bonus harian
          serta hadiah eksklusif!
        </p>
      </div>

      <!-- VIP 1 - 3 -->
      <div v-for="(vip, index) in vipList" :key="index" class="border-t pt-4 space-y-1">
        <p>
          🔓 <strong>VIP {{ vip.level }}</strong>
        </p>
        <p>📥 {{ vip.range }}</p>
        <p>✅ Yang Sudah Sah</p>
        <p>💰 Bonus Harian: {{ vip.dailyBonus }}</p>
        <p v-if="vip.bonusLangsung">🎁 Bonus Langsung: {{ vip.bonusLangsung }}</p>
      </div>

      <!-- VIP 4 detail -->
      <div class="border-t pt-4 space-y-1">
        <p>🔓 <strong>VIP 4</strong></p>
        <p>📥 Mengundang 51 – 100 anggota aktif</p>
        <p>✅ Yang Sudah Sah</p>
        <p>💰 Bonus Harian: 6.5% dari penghasilan tugas</p>
        <p>🎁 Bonus Langsung: US$50.00</p>

        <div class="pt-2">
          <p class="font-semibold">🎯 Bonus Tambahan:</p>
          <ul class="list-disc list-inside ml-2">
            <li>Isi Ulang Pertama: 3%</li>
            <li>Bonus Sponsor Peringkat (1): 12%</li>
          </ul>
        </div>

        <div class="pt-2">
          <p class="font-semibold">🔁 Bonus Rabat:</p>
          <ul class="list-disc list-inside ml-2">
            <li>Peringkat (1): 3%</li>
            <li>Peringkat (2): 1%</li>
            <li>Peringkat (3): 0.5%</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useUserUndangan } from '@/stores/userUndangan'
import QRCode from 'qrcode'

const undanganStore = useUserUndangan()

onMounted(() => {
  undanganStore.fetchUndangan()
})

const referralCode = computed(() => undanganStore.reff)
const fullReferralLink = computed(
  () => `https://walletpay-business.org/register?reff=${referralCode.value}`,
)

const qrSrc = ref('')
const qrRef = ref(null)

watch(
  fullReferralLink,
  async (link) => {
    qrSrc.value = await QRCode.toDataURL(link)
  },
  { immediate: true },
)

const copyLink = async () => {
  await navigator.clipboard.writeText(fullReferralLink.value)
  alert('Link berhasil disalin!')
}

const downloadQR = () => {
  const img = qrRef.value
  const link = document.createElement('a')
  link.href = img.src
  link.download = 'qr-code.png'
  link.click()
}

const vipList = [
  { level: 1, range: 'Mengundang 0 – 10 anggota aktif', dailyBonus: '1.0% dari penghasilan tugas' },
  {
    level: 2,
    range: 'Mengundang 11 – 30 anggota aktif',
    dailyBonus: '2.5% dari penghasilan tugas',
    bonusLangsung: 'US$5.00',
  },
  {
    level: 3,
    range: 'Mengundang 31 – 50 anggota aktif',
    dailyBonus: '4.5% dari penghasilan tugas',
    bonusLangsung: 'US$15.00',
  },
]
</script>
