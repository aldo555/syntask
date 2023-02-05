import { ref } from 'vue'
import { defineStore } from 'pinia'
import TaskService from "@/services/TaskService"

export const useTaskStore = defineStore('task', () => {
  const ongoingTasks = ref([])
  const archivedTasks = ref([])
  const currentlyEditedTask = ref('')

  async function fetchTasks() {
    await TaskService.getTasks().then((response) => {
      ongoingTasks.value = response.data.ongoing_tasks
      archivedTasks.value = response.data.archived_tasks
    })
  }

  async function searchTasks(query) {
    await TaskService.searchTasks(query).then((response) => {
      ongoingTasks.value = response.data.ongoing_tasks
      archivedTasks.value = response.data.archived_tasks
    })
  }

  async function createTask(task) {
    const response = await TaskService.createTask(task)

    ongoingTasks.value.unshift(response.data.task)

    return response
  }

  function markForEdit(task) {
    currentlyEditedTask.value = task
  }

  function resetEdit() {
    currentlyEditedTask.value = ''
  }

  async function updateTask(task) {
    const response = await TaskService.updateTask(task)

    if (task.completed) {
      if (archivedTasks.value.length === 10) {
        archivedTasks.value.pop()
      }
      archivedTasks.value.unshift(response.data.task)
      ongoingTasks.value = ongoingTasks.value.filter((t) => t.id !== task.id)
      return response
    }

    ongoingTasks.value = ongoingTasks.value.map((t) => {
      if (t.id === task.id) {
        return response.data.task
      }

      return t
    })

    return response
  }

  async function deleteTask(task) {
    const response = await TaskService.deleteTask(task)

    ongoingTasks.value = ongoingTasks.value.filter((t) => t.id !== task.id)

    return response
  }

  async function deleteAllTasks() {
    const response = await TaskService.deleteAllTasks()

    ongoingTasks.value = []
    archivedTasks.value = []

    return response
  }

  return { archivedTasks, ongoingTasks, currentlyEditedTask, fetchTasks, searchTasks, createTask, markForEdit, resetEdit, updateTask, deleteTask, deleteAllTasks }
})
