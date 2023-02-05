import * as API from "@/services/API";

export default {
  getTasks() {
    return API.apiClient.get("/task")
  },
  searchTasks(query) {
    return API.apiClient.post('/task/search', query)
  },
  createTask(task) {
    return API.apiClient.post("/task", task)
  },
  updateTask(task) {
    return API.apiClient.put(`/task/${task.id}`, task)
  },
  deleteTask(task) {
    return API.apiClient.delete(`/task/${task.id}`)
  },
  deleteAllTasks() {
    return API.apiClient.delete(`/task`)
  }
};