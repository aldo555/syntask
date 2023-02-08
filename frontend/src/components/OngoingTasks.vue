<template>
  <div>
    <div class="mb-2 text-2xl text-gray-600">Procrastination Station</div>
    <div class="relative">
      <div class="absolute inset-0 rounded-md blur-md opacity-30"></div>
      <div class="relative overflow-hidden bg-gray-800 border border-gray-700 shadow rounded-md">
        <ul v-if="tasks.length" role="list" class="divide-y divide-gray-700" v-auto-animate>
          <li v-for="(task, index) in tasks" :key="task.id" class="flex group">
            <div class="flex items-center pl-4 py-4 sm:pl-6 group-hover:bg-gray-700 transition ease-in-out duration-200">
              <button @click="markAsComplete(task)" @mouseover="showCheckmarkByIndex = index" @mouseout="showCheckmarkByIndex = null" type="button" tabindex="-1" class="w-8 h-8 p-1 inline-flex items-center rounded-md border border-gray-700 hover:border-indigo-300 bg-gray-800 text-indigo-300 hover:bg-indigo-800 transition ease-in-out duration-150">
                <TransitionRoot
                    :show="showCheckmarkByIndex === index"
                    enter="transition-opacity duration-150"
                    enter-from="opacity-0"
                    enter-to="opacity-100"
                    leave="transition-opacity duration-100"
                    leave-from="opacity-100"
                    leave-to="opacity-0"
                >
                  <CheckIcon class="h-6 w-6" aria-hidden="true" />
                </TransitionRoot>
              </button>
            </div>
            <div @click="markForEdit(task)" class="flex flex-grow items-center px-4 py-4 sm:px-6 cursor-pointer group-hover:bg-gray-700 transition ease-in-out duration-200">
              <div class="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                <div class="flex items-center">
                  <div class="flex flex-col">
                    <div class="flex text-sm">
                      <p class="font-medium text-gray-100 text-lg">{{ task.title }}</p>
                    </div>
                    <div>
                      <PriorityBadge v-if="task.priority" :priority="task.priority" :isRemovable="false" />
                      <DueDateBadge v-if="task.due_date" :dueDate="task.due_date" :isRemovable="false" />
                      <TagsBadges v-if="task.tags && task.tags.length > 0" :tags="getTags(task)" :isRemovable="false" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex items-center pr-4 py-4 sm:pr-6 group-hover:bg-gray-700 transition ease-in-out duration-200">
              <button  @click="deleteTask(task)" type="button" tabindex="-1" class="w-8 h-8 p-1 inline-flex items-center rounded-md text-gray-500 hover:text-gray-400">
                <TrashIcon class="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </li>
        </ul>
        <span v-else class="text-gray-600 text-lg text-xl block w-full text-center p-12">
          Looks like it's time to add some tasks, don't you think?
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTaskStore } from "@/stores/task"
import { onMounted, ref} from "vue"
import { CheckIcon, TrashIcon } from '@heroicons/vue/24/outline'
import { TransitionRoot } from '@headlessui/vue'
import PriorityBadge from "@/components/PriorityBadge.vue"
import DueDateBadge from "@/components/DueDateBadge.vue"
import TagsBadges from "@/components/TagsBadges.vue"

const taskStore = useTaskStore()

const tasks = ref([])
const showCheckmarkByIndex = ref(null)

// subscribe to task store and update tasks when it changes
taskStore.$subscribe(() => {
  tasks.value = taskStore.ongoingTasks
})

function getTags(task) {
  return task.tags.map(tag => tag.name.en)
}

onMounted(() => {
  taskStore.fetchTasks().then(() => {
    tasks.value = taskStore.ongoingTasks
  })
})

function markAsComplete(task) {
  taskStore.updateTask({
    ...task,
    tags: task.tags.map(tag => tag.name.en),
    completed: true,
  })
}

function deleteTask(task) {
  taskStore.deleteTask(task)
}

function markForEdit(task) {
  taskStore.markForEdit(task)
}
</script>