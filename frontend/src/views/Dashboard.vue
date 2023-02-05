<template>
  <div class="relative isolate overflow-hidden bg-gray-900 min-h-screen flex justify-center">
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
    <div class="max-w-6xl w-full">
      <div class="mx-auto px-6 max-w-6xl w-full pt-4 flex lg:px-8 justify-between items-center">
        <div class="pr-8">
          <p class="text-gray-400">Hey {{ userStore.user.name.split(' ')[0] }}, the struggle continues.</p>
        </div>
        <div class="flex">
          <SunIcon @click="enableLightMode()" class="h-6 w-6 text-gray-400 mr-2" />
          <ArrowRightOnRectangleIcon @click="logout()" class="h-6 w-6 text-gray-400 cursor-pointer" />
        </div>
      </div>
      <div class="mx-auto px-6 max-w-6xl w-full pt-10 pb-24 sm:pb-32 flex flex-col lg:py-40 lg:pt-32 lg:px-8 items-center">
        <Logo class="text-5xl sm:text-6xl" />

        <SmartInput class="w-full mt-16 md:mt-20 sm:mt-24" />

        <OngoingTasks class="w-full mt-10" />

        <ArchivedTasks class="w-full mt-10" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router"
import { ArrowRightOnRectangleIcon, SunIcon } from '@heroicons/vue/20/solid'
import Logo from '@/components/Logo.vue'
import SmartInput from "@/components/SmartInput.vue"
import OngoingTasks from "@/components/OngoingTasks.vue"
import ArchivedTasks from "@/components/ArchivedTasks.vue"
import { useUserStore } from "@/stores/user"
import { notify } from "notiwind"

const router = useRouter()
const userStore = useUserStore()

function enableLightMode() {
  notify({
    group: "success",
    title: "Whoop-dee-doo!",
    text: "Light mode? More like never-gonna-see-the-light mode.",
    duration: 4000,
  })
}

const logout = () => {
  userStore.logout().then((data) => {
    notify({
      group: "success",
      title: "Whoop-dee-doo!",
      text: data.data.message,
      duration: 4000,
    })

    router.push({ name: "landing" })
  })
}
</script>