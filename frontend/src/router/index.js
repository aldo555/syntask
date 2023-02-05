import { createRouter, createWebHistory } from 'vue-router'
import middlewarePipeline from "@/router/middlewarePipeline"
import auth from "@/middleware/auth"
import guest from "@/middleware/guest"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: () => import('../views/Landing.vue')
    },
    {
      path: '/login',
      name: 'login',
      meta: { middleware: [guest] },
      component: () => import('../views/auth/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      meta: { middleware: [guest] },
      component: () => import('../views/auth/Register.vue')
    },
    {
      path: '/forgot-your-password',
      name: 'forgot-your-password',
      meta: { middleware: [guest] },
      component: () => import('../views/auth/ForgotYourPassword.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      meta: { middleware: [auth] },
      component: () => import('../views/Dashboard.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const middleware = to.meta.middleware
  const context = { to, from, next }

  if (!middleware) {
    return next()
  }

  middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1),
  });
})

export default router
