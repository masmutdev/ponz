// stores/userDetailDeposit.ts
import { defineStore } from 'pinia'
import api from '@/lib/axios'

export const useUserDetailDeposit = defineStore('userDetailDeposit', {
  state: () => ({
    loading: false,
    error: '',
    data: {
      kode_unik: '',
      invoice: '',
      order_id: '',
      bukti: '', // nanti URL
      jumlah: 0,
      status: 0,
      created_at: '',
    },
  }),
  getters: {
    statusLabel: (state) => {
      switch (state.data.status) {
        case 0:
          return 'Pending'
        case 1:
          return 'Lunas'
        case 2:
          return 'Failed'
        case 3:
          return 'Expired'
        default:
          return '-'
      }
    },
  },
  actions: {
    async fetchDetail(invoice: string, order_id: string) {
      this.loading = true
      this.error = ''
      try {
        const res = await api.get('/detail-deposit', { params: { invoice, order_id } })
        const d = res.data.data
        this.data = {
          invoice: d.invoice,
          kode_unik: d.kode_unik,
          order_id: d.order_id,
          bukti: d.bukti || '',
          jumlah: Number(d.jumlah) / 16000,
          status: Number(d.status),
          created_at: d.created_at,
        }
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Gagal load detail deposit'
      } finally {
        this.loading = false
      }
    },
  },
})
