import { defineStore } from 'pinia'
import api from '@/lib/axios'

export const useUserActiveDownline = defineStore('userActiveDownline', {
  state: () => ({
    loading: false,
    error: '',
    totalActiveUser: 0,
    vip: 1,
  }),

  actions: {
    async fetchActiveDownline() {
      this.loading = true
      this.error = ''

      try {
        const res = await api.get('/active-level-1')
        this.totalActiveUser = res.data.total_active_user
        this.vip = res.data.vip
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Gagal memuat data aktif downline'
      } finally {
        this.loading = false
      }
    },
  },
})
