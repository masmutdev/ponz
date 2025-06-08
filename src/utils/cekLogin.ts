export function cekLogin(err: any, showError: (msg: string) => void) {
  const status = err?.response?.status

  if (status === 401) {
    localStorage.removeItem('token')
    showError('Silahkan Login Dahulu')
    setTimeout(() => {
      location.href = '/login'
    }, 1500)
    return true
  }

  return false
}
