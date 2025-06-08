import { defineStore } from 'pinia'
import api from '@/lib/axios'

type DownlineUser = {
  uid: string
  username: string
  nama: string
  hp: string
  reff: string
  upline_reff: string
  total_deposit: number
}

type DownlineData = Record<string, DownlineUser[]>

export const useUserDataDownline = defineStore('userDataDownline', {
  state: () => ({
    loading: false,
    error: '',
    durationMs: 0,
    data: {} as DownlineData,
  }),

  actions: {
    async fetchDownline() {
      this.loading = true
      this.error = ''

      try {
        const res = await api.get('/data-downline')
        this.data = res.data.data
        this.durationMs = res.data.duration_ms
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Gagal memuat data downline'
      } finally {
        this.loading = false
      }
    },
  },
})
