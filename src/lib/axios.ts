import axios from 'axios'
import { cekLogin } from '@/utils/cekLogin'

const api = axios.create({
  baseURL: 'https://ziyuanpanel.cloud/api/',
  headers: {
    Accept: 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// ✅ Global error handler untuk 401
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      cekLogin(error, (msg: string) => {
        alert(msg) // Atau pakai Alerts global nanti
      })
    }
    return Promise.reject(error)
  },
)

export default api
