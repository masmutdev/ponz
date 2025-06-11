import { defineStore } from 'pinia'
import api from '@/lib/axios'

export const useUserRekeningDeposit = defineStore('userRekeningDeposit', {
  state: () => ({
    loading: false,
    error: '',
    data: {
      pemilik_depo: '',
      norek_depo: '',
      bank_depo: '',
    },
  }),

  actions: {
    async fetchRekening() {
      this.loading = true
      this.error = ''
      try {
        const res = await api.get('/detail-rekening-deposit')
        this.data = res.data.data || {
          pemilik_depo: '',
          norek_depo: '',
          bank_depo: '',
        }
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Gagal memuat data rekening'
      } finally {
        this.loading = false
      }
    },
  },
})
