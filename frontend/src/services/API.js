import axios from "axios"
import { useUserStore } from "@/stores/user"

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_SYNTASK_API_URL + "/api",
  withCredentials: true,
})

apiClient.interceptors.response.use(
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

    return Promise.reject(error);
  }
);