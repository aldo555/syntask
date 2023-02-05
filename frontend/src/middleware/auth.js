import {useUserStore} from "@/stores/user"

export default function auth({ to, next }) {
  const userStore = useUserStore()

  if (!userStore.user) {
    userStore.fetchUser().then(() => {
      if (userStore.user) {
        next()
      }
      next({name: 'login'})
    }).catch(() => {
      next({name: 'login'})
    })
  } else {
    next()
  }
}