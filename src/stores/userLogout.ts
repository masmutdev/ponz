// stores/userLogout.ts
import { defineStore } from 'pinia'
import api from '@/lib/axios'

export const useUserLogout = defineStore('userLogout', {
  actions: {
    async logout() {
      try {
        await api.post('/logout/user')
        localStorage.clear()
      } catch (err) {
        console.error('Logout gagal:', err)
        throw err
      }
    },
  },
})
