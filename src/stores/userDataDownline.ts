import { defineStore } from 'pinia'
import api from '@/lib/axios'

type DownlineUser = {
  uid: string
  email: string
  nama: string
  hp: string
  reff: string
  upline_reff: string
  total_deposit: number
  total_withdraw: number
  total_staking: number
  total_profit: number
}

type DownlineLevelData = {
  total_active: number
  users: DownlineUser[]
}

type DownlineData = {
  level_1?: DownlineLevelData
  level_2?: DownlineLevelData
  level_3?: DownlineLevelData
}

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
        this.data = {
          level_1: res.data.level_1,
        }
        this.durationMs = res.data.duration_ms
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Gagal memuat data downline'
      } finally {
        this.loading = false
      }
    },
  },
})
