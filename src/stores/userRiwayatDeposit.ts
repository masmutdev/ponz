import { defineStore } from 'pinia'
import api from '@/lib/axios'

export const useUserRiwayatDeposit = defineStore('userRiwayatDeposit', {
  state: () => ({
    loading: false,
    error: '',
    data: [] as Array<{
      invoice: string
      order_id: string
      jumlah: number
      status: string
      created_at: string
    }>,
  }),

  actions: {
    async fetchRiwayatDeposit() {
      this.loading = true
      this.error = ''

      try {
        const res = await api.get('/riwayat-deposit')
        this.data = res.data.data || []
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Gagal memuat riwayat deposit'
      } finally {
        this.loading = false
      }
    },
  },
})
