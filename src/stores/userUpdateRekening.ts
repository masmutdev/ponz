// stores/userUpdateRekening.ts
import { defineStore } from 'pinia'
import api from '@/lib/axios'

export const useUserUpdateRekening = defineStore('userUpdateRekening', {
  state: () => ({
    loading: false,
    error: '',
    success: '',
  }),

  actions: {
    async updateRekening(data: { bank: string; pemilik: string; norek: string }) {
      this.loading = true
      this.error = ''
      this.success = ''

      try {
        const res = await api.post('/user-update-rekening', {
          bank: data.bank,
          pemilik: data.pemilik,
          norek: data.norek,
        })

        this.success = res.data.message || 'Berhasil memperbarui data rekening'
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Gagal menyimpan data rekening'
      } finally {
        this.loading = false
      }
    },
  },
})
