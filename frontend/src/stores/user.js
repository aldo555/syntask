import { ref } from 'vue'
import { defineStore } from 'pinia'
import AuthService from "@/services/AuthService";

export const useUserStore = defineStore('user', () => {
  const user = ref(null)

  function setUser(data) {
    user.value = data
  }

  async function fetchUser() {
    await AuthService.me().then((response) => {
      user.value = response.data
    });
  }

  async function logout() {
    const response = await AuthService.logout()
    user.value = null
    return response
  }

  return { user, setUser, fetchUser, logout }
})
