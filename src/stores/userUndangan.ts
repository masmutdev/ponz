// stores/userUndangan.ts
import { defineStore } from 'pinia'
import api from '@/lib/axios'

export const useUserUndangan = defineStore('userUndangan', {
  state: () => ({
    hp: '',
    reff: '',
    loading: false,
    error: '',
  }),

  actions: {
    async fetchUndangan() {
      this.loading = true
      this.error = ''

      try {
        const res = await api.get('/user-undangan')
        this.hp = res.data.data.hp
        this.reff = res.data.data.reff
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Gagal memuat data undangan'
      } finally {
        this.loading = false
      }
    },
  },
})
