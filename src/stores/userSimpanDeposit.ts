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
    async simpan(payload: { jumlahUSD: number; bank: string; norek: string; qr: string }) {
      this.loading = true
      this.error = ''
      this.message = ''
      this.invoice = ''
      this.orderId = ''

      try {
        const res = await api.post('/simpan-deposit', {
          jumlah: payload.jumlahUSD * 16000,
          bank: payload.bank,
          norek: payload.norek,
          qr: payload.qr,
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
