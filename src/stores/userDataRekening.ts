// stores/userDataRekening.ts
import { defineStore } from 'pinia'
import api from '@/lib/axios'

export const useUserDataRekening = defineStore('userDataRekening', {
  state: () => ({
    loading: false,
    error: '',
    data: {
      bank: '',
      pemilik: '',
      norek: '',
    },
  }),

  actions: {
    async fetchRekening() {
      this.loading = true
      this.error = ''

      try {
        const res = await api.get('/user-data-rekening')
        this.data = res.data.data || { bank: '', pemilik: '', norek: '' }
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Gagal memuat data rekening'
      } finally {
        this.loading = false
      }
    },
  },
})
