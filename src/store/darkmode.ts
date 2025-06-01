export const initDarkMode = () => {
  let savedMode = localStorage.getItem('darkMode')

  if (savedMode === null) {
    // User pertama kali, ambil preferensi sistem
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    savedMode = prefersDark.toString()
    localStorage.setItem('darkMode', savedMode)
  }

  document.documentElement.classList.toggle('dark', savedMode === 'true')
}
