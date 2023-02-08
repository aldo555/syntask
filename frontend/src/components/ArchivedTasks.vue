<template>
  <div>
    <div v-if="tasks.length" class="mb-4 text-2xl text-gray-500">Past Tasks Cemetery</div>
    <div v-if="tasks.length" class="overflow-hidden bg-gray-600/10 backdrop-blur-sm border border-gray-800 shadow rounded-md opacity-90">
      <ul role="list" class="divide-y divide-gray-800" v-auto-animate>
        <li v-for="task in tasks" :key="task.id" class="flex">
          <div class="flex flex-grow items-center px-4 py-4 sm:px-6">
            <div class="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
              <div class="flex items-center">
                <div class="flex flex-col">
                  <div class="flex text-sm">
                    <p class="font-medium text-gray-300 text-lg">{{ task.title }}</p>
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
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useTaskStore } from "@/stores/task"
import { onMounted, ref} from "vue"
import { CheckIcon, TrashIcon } from '@heroicons/vue/24/outline'
import PriorityBadge from "@/components/PriorityBadge.vue"
import DueDateBadge from "@/components/DueDateBadge.vue"
import TagsBadges from "@/components/TagsBadges.vue"

const taskStore = useTaskStore()

const tasks = ref([])

// subscribe to task store and update tasks when it changes
taskStore.$subscribe(() => {
  tasks.value = taskStore.archivedTasks
})

function getTags(task) {
  return task.tags.map(tag => tag.name.en)
}

onMounted(() => {
  taskStore.fetchTasks().then(() => {
    tasks.value = taskStore.archivedTasks
  })
})
</script>