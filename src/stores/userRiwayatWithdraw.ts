import { defineStore } from 'pinia'
import api from '@/lib/axios'

export const useUserRiwayatWithdraw = defineStore('userRiwayatWithdraw', {
  state: () => ({
    loading: false,
    error: '',
    data: [] as Array<{
      jumlah_withdraw: number
      status: string
      created_at: string
    }>,
  }),

  actions: {
    async fetchRiwayatWithdraw() {
      this.loading = true
      this.error = ''

      try {
        const res = await api.get('/riwayat-withdraw')
        this.data = res.data.data || []
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Gagal memuat riwayat withdraw'
      } finally {
        this.loading = false
      }
    },
  },
})
