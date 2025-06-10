// stores/userSaldo.ts
import { defineStore } from 'pinia'
import api from '@/lib/axios'

export const useUserSaldo = defineStore('userSaldo', {
  state: () => ({
    saldo: 0,
  }),
  actions: {
    async fetchSaldo() {
      try {
        const res = await api.get('/user-saldo')
        this.saldo = res.data.saldo || 0
      } catch (err) {
        console.error('Gagal fetch saldo:', err)
      }
    },
  },
})
