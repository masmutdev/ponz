import { defineStore } from 'pinia'
import api from '@/lib/axios'

export const userSimpanPesanan2 = defineStore('userSimpanPesanan2', {
  state: () => ({
    loading: false,
    error: '',
    successMessage: '',
  }),

  actions: {
    async simpanPesanan(payload: { kode_produk: string; harga: number }) {
      this.loading = true
      this.error = ''
      this.successMessage = ''

      try {
        const res = await api.post('/simpan-pesanan2', payload)
        this.successMessage = res.data.message
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Gagal menyimpan pesanan'
      } finally {
        this.loading = false
      }
    },
  },
})
