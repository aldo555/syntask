<template>
  <div class="relative isolate overflow-hidden bg-gray-900 min-h-screen flex justify-center">
    <div class="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-10rem]">
      <svg class="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(70%-30rem)] sm:h-[90.375rem]" viewBox="0 0 1155 678">
        <path fill="url(#f4773080-2a16-4ab4-9fd7-579fec69a4f7)" fill-opacity=".1" d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z" />
        <defs>
          <linearGradient id="f4773080-2a16-4ab4-9fd7-579fec69a4f7" x1="1155.49" x2="-78.208" y1=".177" y2="474.645" gradientUnits="userSpaceOnUse">
            <stop stop-color="#9089FC" />
            <stop offset="1" stop-color="#FF80B5" />
          </linearGradient>
        </defs>
      </svg>
    </div>
    <div class="max-w-6xl w-full">
      <div class="mx-auto px-6 max-w-6xl w-full pt-4 flex lg:px-8 justify-between items-center">
        <div class="pr-8">
          <p class="text-gray-400">Hey <span class="font-medium text-gray-300">{{ userStore.user.name.split(' ')[0] }}</span>, the struggle continues.</p>
        </div>
        <div class="flex">
          <SunIcon @click="enableLightMode()" class="h-6 w-6 text-gray-400 mr-2" />
          <ArrowRightOnRectangleIcon @click="logout()" class="h-6 w-6 text-gray-400 cursor-pointer" />
        </div>
      </div>
      <div class="mx-auto px-6 max-w-6xl w-full pt-16 pb-24 sm:pb-32 flex flex-col lg:py-40 lg:pt-32 lg:px-8 items-center">
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