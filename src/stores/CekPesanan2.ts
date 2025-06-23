// stores/CekPesanan.ts
import { defineStore } from 'pinia'
import api from '@/lib/axios'

export const useCekPesanan2 = defineStore('cekPesanan2', {
  state: () => ({
    kodeYangSudahDipesan: [] as string[],
    loading: false,
    error: '',
  }),

  actions: {
    async fetchPesanan() {
      this.loading = true
      try {
        const res = await api.get('/cek-pesanan2')
        this.kodeYangSudahDipesan = res.data.data || []
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Gagal cek pesanan'
      } finally {
        this.loading = false
      }
    },

    isSudahDipesan(kode: string) {
      return this.kodeYangSudahDipesan.includes(kode)
    },
  },
})
