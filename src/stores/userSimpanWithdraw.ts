// stores/userSimpanWithdraw.ts
import { defineStore } from 'pinia'
import api from '@/lib/axios'

export const useUserSimpanWithdraw = defineStore('userSimpanWithdraw', {
  state: () => ({
    loading: false,
    error: '',
    message: '',
  }),

  actions: {
    async simpan(jumlah: number) {
      this.loading = true
      this.error = ''
      this.message = ''

      try {
        const res = await api.post('/simpan-withdraw', {
          jumlah_withdraw: jumlah,
        })
        this.message = res.data.message
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Gagal mengajukan withdraw'
      } finally {
        this.loading = false
      }
    },
  },
})
