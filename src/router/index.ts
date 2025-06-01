import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/views/walletpay/Dashboard.vue'
import Pengaturan from '@/views/walletpay/Pengaturan.vue'
import Tim from '@/views/walletpay/Tim.vue'
import Crypto from '@/views/walletpay/Crypto.vue'
import Undangan from '@/views/walletpay/Undangan.vue'
import Withdraw from '@/views/walletpay/Withdraw.vue'
import Deposit from '@/views/walletpay/Deposit.vue'
import Notifikasi from '@/views/walletpay/Notifikasi.vue'
import Riwayat from '@/views/walletpay/Riwayat.vue'
import DataPenarikan from '@/views/walletpay/DataPenarikan.vue'
import Keamanan from '@/views/walletpay/Keamanan.vue'
import RiwayatTransaksi from '@/views/walletpay/RiwayatTransaksi.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
    },
    {
      path: '/crypto',
      name: 'crypto',
      component: Crypto,
    },
    {
      path: '/tim',
      name: 'tim',
      component: Tim,
    },
    {
      path: '/pengaturan',
      name: 'pengaturan',
      component: Pengaturan,
    },
    {
      path: '/deposit',
      name: 'deposit',
      component: Deposit,
    },
    {
      path: '/withdraw',
      name: 'withdraw',
      component: Withdraw,
    },
    {
      path: '/undangan',
      name: 'undangan',
      component: Undangan,
    },
    {
      path: '/notifikasi',
      name: 'notifikasi',
      component: Notifikasi,
    },
    {
      path: '/riwayat',
      name: 'riwayat',
      component: Riwayat,
    },
    {
      path: '/keamanan',
      name: 'keamanan',
      component: Keamanan,
    },
    {
      path: '/data-penarikan',
      name: 'data-penarikan',
      component: DataPenarikan,
    },
    {
      path: '/riwayat-transaksi',
      name: 'riwayat-transaksi',
      component: RiwayatTransaksi,
    },
  ],
})

export default router
