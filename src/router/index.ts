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
      path: '/login',
      name: 'login',
      component: () => import('@/views/walletpay/auth/Login.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/walletpay/auth/Register.vue'),
    },
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      meta: { requiresAuth: true },
    },
    {
      path: '/crypto',
      name: 'crypto',
      component: Crypto,
      meta: { requiresAuth: true },
    },
    {
      path: '/tim',
      name: 'tim',
      component: Tim,
      meta: { requiresAuth: true },
    },
    {
      path: '/pengaturan',
      name: 'pengaturan',
      component: Pengaturan,
      meta: { requiresAuth: true },
    },
    {
      path: '/deposit',
      name: 'deposit',
      component: Deposit,
      meta: { requiresAuth: true },
    },
    {
      path: '/withdraw',
      name: 'withdraw',
      component: Withdraw,
      meta: { requiresAuth: true },
    },
    {
      path: '/undangan',
      name: 'undangan',
      component: Undangan,
      meta: { requiresAuth: true },
    },
    {
      path: '/notifikasi',
      name: 'notifikasi',
      component: Notifikasi,
      meta: { requiresAuth: true },
    },
    {
      path: '/riwayat',
      name: 'riwayat',
      component: Riwayat,
      meta: { requiresAuth: true },
    },
    {
      path: '/keamanan',
      name: 'keamanan',
      component: Keamanan,
      meta: { requiresAuth: true },
    },
    {
      path: '/data-penarikan',
      name: 'data-penarikan',
      component: DataPenarikan,
      meta: { requiresAuth: true },
    },
    {
      path: '/riwayat-transaksi',
      name: 'riwayat-transaksi',
      component: RiwayatTransaksi,
      meta: { requiresAuth: true },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFound.vue'), // atau ganti path sesuai file kamu
    },
  ],
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')

  if (to.meta.requiresAuth && !token) {
    return next({
      path: '/login',
      query: { message: 'Silahkan Login Dulu' },
      replace: true,
    })
  }

  if ((to.path === '/login' || to.path === '/register') && token) {
    return next({ path: '/', replace: true })
  }

  next()
})

export default router
