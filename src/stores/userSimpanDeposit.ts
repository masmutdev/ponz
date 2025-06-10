// stores/userSimpanDeposit.ts
import { defineStore } from 'pinia'
import api from '@/lib/axios'

export const useUserSimpanDeposit = defineStore('userSimpanDeposit', {
  state: () => ({
    loading: false,
    error: '',
    message: '',
    invoice: '',
    orderId: '',
  }),

  actions: {
    async simpan(jumlahUSD: number) {
      this.loading = true
      this.error = ''
      this.message = ''
      this.invoice = ''
      this.orderId = ''

      try {
        const res = await api.post('/simpan-deposit', {
          jumlah: jumlahUSD * 16000,
        })

        const data = res.data
        this.message = data.message
        this.invoice = data.invoice
        this.orderId = data.order_id
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Gagal mengajukan deposit'
      } finally {
        this.loading = false
      }
    },
  },
})
