import { defineStore } from 'pinia'
import api from '@/lib/axios'

export const userPengaturan = defineStore('userPengaturan', {
  state: () => ({
    loading: false,
    error: '',
    totalDeposit: 0,
    totalWithdraw: 0,
    totalBonus: 0,
    totalStaking: 0,
  }),

  actions: {
    async fetchPengaturan() {
      this.loading = true
      this.error = ''

      try {
        const res = await api.get('/data-pengaturan')
        const data = res.data.data
        this.totalDeposit = data.total_deposit
        this.totalWithdraw = data.total_withdraw
        this.totalBonus = data.total_bonus
        this.totalStaking = data.total_staking
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Gagal memuat data pengaturan'
      } finally {
        this.loading = false
      }
    },
  },
})
