import { defineStore } from 'pinia'
import api from '@/lib/axios'

export const userSimpanPesanan = defineStore('userSimpanPesanan', {
  state: () => ({
    loading: false,
    error: '',
    successMessage: '',
    vip: 1,
  }),

  actions: {
    async simpanPesanan(payload: { kode_produk: string; harga: number }) {
      this.loading = true
      this.error = ''
      this.successMessage = ''

      try {
        const res = await api.post('/simpan-pesanan', payload)
        this.successMessage = res.data.message
        this.vip = res.data.vip
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Gagal menyimpan pesanan'
      } finally {
        this.loading = false
      }
    },
  },
})
