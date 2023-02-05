

<template>
  <RouterView />

  <NotificationGroup group="success">
    <div
        class="fixed inset-0 flex items-start justify-end p-6 px-4 py-6 pointer-events-none"
    >
      <div class="w-full max-w-sm">
        <Notification
            v-slot="{ notifications }"
            enter="transform ease-out duration-300 transition"
            enter-from="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-4"
            enter-to="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-500"
            leave-from="opacity-100"
            leave-to="opacity-0"
            move="transition duration-500"
            move-delay="delay-300"
        >
          <div
              class="flex w-full max-w-sm mx-auto mt-4 overflow-hidden bg-gray-800 border border-gray-700 rounded-lg shadow-md"
              v-for="notification in notifications"
              :key="notification.id"
          >
            <div class="flex items-center justify-center w-12 bg-gray-800 border-r border-gray-700">
              <CheckBadgeIcon class="w-6 h-6 text-indigo-600 fill-current" />
            </div>

            <div class="px-4 py-2 -mx-3">
              <div class="mx-3">
                <span class="font-semibold text-indigo-500">{{ notification.title }}</span>
                <p class="text-sm text-gray-300">{{ notification.text }}</p>
              </div>
            </div>
          </div>
        </Notification>
      </div>
    </div>
  </NotificationGroup>

  <NotificationGroup group="error">
    <div
        class="fixed inset-0 flex items-start justify-end p-6 px-4 py-6 pointer-events-none"
    >
      <div class="w-full max-w-sm">
        <Notification
            v-slot="{ notifications }"
            enter="transform ease-out duration-300 transition"
            enter-from="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-4"
            enter-to="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-500"
            leave-from="opacity-100"
            leave-to="opacity-0"
            move="transition duration-500"
            move-delay="delay-300"
        >
          <div
              class="flex w-full max-w-sm mx-auto mt-4 overflow-hidden bg-gray-800 border border-gray-700 rounded-lg shadow-md"
              v-for="notification in notifications"
              :key="notification.id"
          >
            <div class="flex items-center justify-center w-12 bg-gray-800 border-r border-gray-700">
              <XCircleIcon class="w-6 h-6 text-red-600 fill-current" />
            </div>

            <div class="px-4 py-2 -mx-3">
              <div class="mx-3">
                <span class="font-semibold text-red-500">{{ notification.title }}</span>
                <p class="text-sm text-gray-300">{{ notification.text }}</p>
              </div>
            </div>
          </div>
        </Notification>
      </div>
    </div>
  </NotificationGroup>
</template>

<script setup>
import { RouterView } from 'vue-router'
import { CheckBadgeIcon, XCircleIcon } from '@heroicons/vue/20/solid'
</script>
