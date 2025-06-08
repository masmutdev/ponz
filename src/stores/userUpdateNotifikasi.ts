// stores/userUpdateNotifikasi.ts
import { defineStore } from 'pinia'
import api from '@/lib/axios'

export const userUpdateNotifikasi = defineStore('userUpdateNotifikasi', {
  state: () => ({
    loading: false,
    error: '',
    data: [] as Array<{
      judul: string
      pesan: string
      tanggal: string
    }>,
  }),

  actions: {
    async updateDanAmbilNotifikasi() {
      this.loading = true
      this.error = ''

      try {
        const res = await api.get('/user-update-notifikasi')
        const { bonus, deposit, withdraw } = res.data.notifications
        const now = new Date()

        const formatUSDBonus = (angka: number) =>
          `$${Math.round(angka / 16000).toLocaleString('en-US')}`

        const formatUSD = (angka: number) => `$${(angka / 16000).toFixed(2)}`

        this.data = [
          ...bonus.map((b: any) => ({
            judul: 'Bonus Diterima',
            pesan: `Anda mendapatkan bonus ${b.kategori_bonus} sebesar ${formatUSDBonus(b.jumlah_bonus)}`,
            tanggal: now.toLocaleString('id-ID'),
          })),
          ...deposit.map((d: any) => ({
            judul: 'Deposit Masuk',
            pesan: `Deposit sebesar ${formatUSD(d.jumlah)} telah diterima.`,
            tanggal: new Date(d.created_at).toLocaleString('id-ID'),
          })),
          ...withdraw.map((w: any) => ({
            judul: 'Withdraw Diterima',
            pesan: `Withdraw sebesar ${formatUSD(w.jumlah_withdraw)} sedang diproses.`,
            tanggal: now.toLocaleString('id-ID'),
          })),
        ]
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Gagal update notifikasi'
      } finally {
        this.loading = false
      }
    },
  },
})
