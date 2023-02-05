<template>
  <div class="relative isolate overflow-hidden bg-gray-900 min-h-screen flex items-center">
    <svg class="absolute inset-0 -z-10 h-full w-full stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]" aria-hidden="true">
      <defs>
        <pattern id="983e3e4c-de6d-4c3f-8d64-b9761d1534cc" width="200" height="200" x="50%" y="-1" patternUnits="userSpaceOnUse">
          <path d="M.5 200V.5H200" fill="none" />
        </pattern>
      </defs>
      <svg x="50%" y="-1" class="overflow-visible fill-gray-800/20">
        <path d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z" stroke-width="0" />
      </svg>
      <rect width="100%" height="100%" stroke-width="0" fill="url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)" />
    </svg>
    <svg viewBox="0 0 1108 632" aria-hidden="true" class="absolute top-10 left-[calc(50%-4rem)] -z-10 w-[69.25rem] max-w-none transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]">
      <path fill="url(#175c433f-44f6-4d59-93f0-c5c51ad5566d)" fill-opacity=".2" d="M235.233 402.609 57.541 321.573.83 631.05l234.404-228.441 320.018 145.945c-65.036-115.261-134.286-322.756 109.01-230.655C968.382 433.026 1031 651.247 1092.23 459.36c48.98-153.51-34.51-321.107-82.37-385.717L810.952 324.222 648.261.088 235.233 402.609Z" />
      <defs>
        <linearGradient id="175c433f-44f6-4d59-93f0-c5c51ad5566d" x1="1220.59" x2="-85.053" y1="432.766" y2="638.714" gradientUnits="userSpaceOnUse">
          <stop stop-color="#4F46E5" />
          <stop offset="1" stop-color="#80CAFF" />
        </linearGradient>
      </defs>
    </svg>
    <div class="mx-auto px-6 max-w-lg w-full pt-10 pb-24 sm:pb-32 lg:flex lg:py-40 lg:px-8 items-center">
      <div class="w-full space-y-8">
        <div>
          <div class="flex">
            <Logo class="w-full text-center" />
          </div>
          <h2 class="mt-8 text-center text-3xl font-bold tracking-tight text-gray-50">Finally, Admit Defeat and Login</h2>
          <p class="mt-2 text-center text-sm text-gray-300">
            or
            {{ ' ' }}
            <router-link to="register" class="font-medium text-indigo-500 hover:text-indigo-400">Join the club, it's free (for now)</router-link>
          </p>
        </div>
        <form @submit.prevent="onSubmit()" class="mt-8 space-y-6">
          <input type="hidden" name="remember" value="true" />
          <div class="-space-y-px rounded-md shadow-sm">
            <div>
              <label for="email-address" class="sr-only">Email address</label>
              <input v-model="email" id="email-address" name="email" type="email" autocomplete="email" required class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-700 px-3 py-2 bg-gray-800 text-gray-50 placeholder-gray-600 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Email address" />
            </div>
            <div>
              <label for="password" class="sr-only">Password</label>
              <input v-model="password" id="password" name="password" type="password" autocomplete="current-password" required class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-700 px-3 py-2 bg-gray-800 text-gray-50 placeholder-gray-600 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Password" />
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input v-model="remember" id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 rounded border-gray-700 bg-gray-800 text-indigo-600 focus:ring-indigo-500" />
              <label for="remember-me" class="ml-2 block text-sm text-gray-50">Remember me</label>
            </div>

            <div class="text-sm">
              <router-link to="forgot-your-password" class="font-medium text-indigo-500 hover:text-indigo-400">Forgot your password?</router-link>
            </div>
          </div>

          <div>
            <button type="submit" class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-500 py-2 px-4 text-sm font-medium text-indigo-50 hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
              <LockClosedIcon class="h-5 w-5 text-indigo-400 group-hover:text-indigo-300" aria-hidden="true" />
            </span>
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from "vue-router"
import { LockClosedIcon } from '@heroicons/vue/20/solid'
import Logo from '@/components/Logo.vue'
import AuthService from "@/services/AuthService"
import { useUserStore } from "@/stores/user"
import {notify} from "notiwind";

const router = useRouter()

const userStore = useUserStore()

const email = ref("")
const password = ref("")
const remember = ref(false)

function onSubmit() {
  AuthService.login({
    email: email.value,
    password: password.value,
    remember: remember.value,
  }).then((response) => {
    userStore.setUser(response.data.user)
    notify({
      group: "success",
      title: "Whoop-dee-doo!",
      text: response.data.message
    }, 4000)
    router.push({ name: 'dashboard' })
  }, (error) => {
    notify({
      group: "error",
      title: "Oh joy, another error.",
      text: error.response.data.message
    }, 4000)
  })
}


</script>