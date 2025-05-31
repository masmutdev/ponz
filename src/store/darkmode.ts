export const initDarkMode = () => {
  const savedMode = localStorage.getItem('darkMode')
  if (savedMode === 'true') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}
