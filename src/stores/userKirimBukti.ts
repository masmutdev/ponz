// stores/userKirimBukti.ts
import { defineStore } from 'pinia'
import api from '@/lib/axios'

export const useUserKirimBukti = defineStore('userKirimBukti', {
  state: () => ({
    loading: false,
    error: '',
    message: '',
  }),

  actions: {
    async kirim({ file, invoice, order_id }: { file: File; invoice: string; order_id: string }) {
      this.loading = true
      this.error = ''
      this.message = ''

      try {
        const formData = new FormData()
        formData.append('bukti', file)
        formData.append('invoice', invoice)
        formData.append('order_id', order_id)

        const res = await api.post('/kirim-bukti', formData)
        this.message = res.data.message
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Gagal mengirim bukti'
      } finally {
        this.loading = false
      }
    },
  },
})
