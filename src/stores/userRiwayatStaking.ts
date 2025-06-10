// stores/useRiwayatStaking.ts
import { defineStore } from 'pinia'
import api from '@/lib/axios'

export const useRiwayatStaking = defineStore('riwayatStaking', {
  state: () => ({
    loading: false,
    error: '',
    data: [] as Array<{
      id: number
      kode_produk: string
      nama_produk: string
      profit_perhari: number
      total_profit: number
      created_at: string
      status: number
    }>,
  }),
  actions: {
    async fetchRiwayat() {
      this.loading = true
      this.error = ''
      try {
        const res = await api.get('/data-pesanan')
        this.data = res.data.data
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Gagal memuat riwayat'
      } finally {
        this.loading = false
      }
    },
  },
})
