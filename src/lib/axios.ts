import axios from 'axios'
import router from '@/router' // pastikan ini mengarah ke router kamu

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

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status
    const msg = error.response?.data?.message

    if (status === 401) {
      localStorage.removeItem('token')
      window.location.href =
        '/login?message=' + encodeURIComponent('Sesi Habis, Silahkan Login Ulang')
    }

    return Promise.reject(error)
  },
)

export default api
