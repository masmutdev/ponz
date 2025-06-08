import { defineStore } from 'pinia'
import api from '@/lib/axios'

export const useUserDashboard = defineStore('userDashboard', {
  state: () => ({
    user: null as null | {
      id: number
      uid: string
      nama: string
      hp: string
      saldo: number
    },
    bonusProfitStaking: 0,
    loading: false,
    error: '',
  }),

  getters: {
    saldoUSD(state): string {
      const saldo = Number(state.user?.saldo) || 0
      const usd = Math.round((saldo / 16000) * 100) / 100
      return `$${usd.toFixed(2)}`
    },
    bonusProfitUSD(state): string {
      const bonus = Number(state.bonusProfitStaking) || 0
      const usd = Math.round((bonus / 16000) * 100) / 100
      return `$${usd.toFixed(2)}`
    },
  },

  actions: {
    async fetchUserDashboard() {
      this.loading = true
      this.error = ''

      try {
        const res = await api.get('/user-dashboard')
        this.user = res.data.data.user
        this.bonusProfitStaking = res.data.data.bonus_profit_staking
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Gagal memuat dashboard'
      } finally {
        this.loading = false
      }
    },
  },
})
