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
      harga: number
      durasi: number
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

        // 🧼 Optional: ensure numeric conversion for harga & durasi if needed
        this.data = res.data.data.map((item: any) => ({
          ...item,
          harga: parseFloat(item.harga),
          durasi: parseInt(item.durasi),
          profit_perhari: parseFloat(item.profit_perhari),
          total_profit: parseFloat(item.total_profit),
          status: parseInt(item.status),
        }))
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Gagal memuat riwayat'
      } finally {
        this.loading = false
      }
    },
  },
})
