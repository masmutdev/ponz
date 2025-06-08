import { defineStore } from 'pinia'
import api from '@/lib/axios'

export const useUserRiwayatBonus = defineStore('userRiwayatBonus', {
  state: () => ({
    loading: false,
    error: '',
    data: [] as Array<{
      kode_bonus: string
      kategori_bonus: string
      jumlah_bonus: number
      created_at: string
    }>,
  }),

  actions: {
    async fetchRiwayatBonus() {
      this.loading = true
      this.error = ''

      try {
        const res = await api.get('/riwayat-bonus')
        this.data = res.data.data || []
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Gagal memuat riwayat bonus'
      } finally {
        this.loading = false
      }
    },
  },
})
