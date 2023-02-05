import {useUserStore} from "@/stores/user"

export default function guest({ to, next }) {
  const userStore = useUserStore()

  if (!userStore.user) {
    userStore.fetchUser().then(() => {
      if (userStore.user) {
        next('dashboard')
      }

      next()
    }).catch(() => {
      next()
    })
  } else {
    next('dashboard')
  }
}