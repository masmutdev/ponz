// stores/userUpdatePassword.ts
import { defineStore } from 'pinia'
import api from '@/lib/axios'

export const useUserUpdatePassword = defineStore('userUpdatePassword', {
  state: () => ({
    loading: false,
    error: '',
    success: '',
  }),

  actions: {
    async updatePassword(oldPassword: string, newPassword: string, confirmPassword: string) {
      this.loading = true
      this.error = ''
      this.success = ''

      try {
        const res = await api.post('/user-update-password', {
          old_password: oldPassword,
          new_password: newPassword,
          new_password_confirmation: confirmPassword,
        })

        this.success = res.data.message || 'Password berhasil diperbarui'
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Gagal mengganti password'
      } finally {
        this.loading = false
      }
    },
  },
})
