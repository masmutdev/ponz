<template>
  <form @submit.prevent="login">
    <input v-model="email" type="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <button type="submit">Register</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')

const login = async () => {
  try {
    // ini mock, ganti sesuai backend kamu
    if (email.value === 'admin@mail.com' && password.value === '123') {
      localStorage.setItem('token', 'fake-jwt-token')
      router.push('/')
    } else {
      alert('Login gagal')
    }
  } catch (err) {
    console.error(err)
  }
}
</script>
