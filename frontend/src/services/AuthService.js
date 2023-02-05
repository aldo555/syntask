import axios from "axios"
import { useUserStore } from "@/stores/user"

export const authClient = axios.create({
  baseURL: 'https://api.syntask.app/',
  withCredentials: true,
})

authClient.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    const userStore = useUserStore()

    if (
      error.response &&
      [401, 419].includes(error.response.status) &&
      userStore.user
    ) {
      userStore.logout()
    }

    return Promise.reject(error)
  }
);

export default {
  async login(payload) {
    await authClient.get("/sanctum/csrf-cookie")
    return authClient.post("/login", payload)
  },
  logout() {
    return authClient.post("/logout")
  },
  async register(payload) {
    await authClient.get("/sanctum/csrf-cookie")
    return authClient.post("/register", payload)
  },
  me() {
    return authClient.get("/api/me")
  },
};