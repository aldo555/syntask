<template>
  <div>
    <div class="text-center" :class="{'mb-3': isSyntaskGuideShown, 'mb-6': !isSyntaskGuideShown }">
      <span v-if="isSyntaskGuideShown" @click="isSyntaskGuideShown = false" class="cursor-pointer text-gray-300 hover:text-gray-200">Hide Syntask Guide</span>
      <span v-else @click="isSyntaskGuideShown = true" class="cursor-pointer text-gray-300 hover:text-gray-200">Show Syntask Guide</span>
    </div>
    <div v-show="isSyntaskGuideShown" class="bg-gray-500/10 backdrop-blur-sm rounded-md mb-6 px-4 py-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <div class="hidden lg:block">
        <kbd class="inline-flex items-center rounded border bg-gray-800 border-gray-700 px-2 font-sans text-sm font-medium text-gray-50">⇧N</kbd>
        <span @click="switchToNewTask()" class="text-sm text-gray-300 ml-2 hover:text-gray-100 cursor-pointer">Create a new task</span>
      </div>
      <div class="hidden lg:block">
        <kbd class="inline-flex items-center rounded border bg-gray-800 border-gray-700 px-2 font-sans text-sm font-medium text-gray-50">⇧S</kbd>
        <span @click="switchToSearch()" class="text-sm text-gray-300 ml-2 hover:text-gray-100 cursor-pointer">Search tasks</span>
      </div>
      <div class="hidden lg:block">
        <kbd class="inline-flex items-center rounded border bg-gray-800 border-gray-700 px-2 font-sans text-sm font-medium text-gray-50">⇧R</kbd>
        <span @click="resetUserInput()" class="text-sm text-gray-300 ml-2 hover:text-gray-100 cursor-pointer">Reset input</span>
      </div>
      <div class="hidden lg:block">
        <kbd class="inline-flex items-center rounded border bg-gray-800 border-gray-700 px-2 font-sans text-sm font-medium text-gray-50">⇧W</kbd>
        <span @click="deleteAllTasks()" class="text-sm text-gray-300 ml-2 hover:text-gray-100 cursor-pointer">Relieve all stress</span>
      </div>
      <div class="col-span-4 text-gray-100 px-2 lg:pt-2 text-md">
        <p class="text-indigo-500 mb-1"><strong>#</strong>  Tag your tasks with ease using hashtags. #BecauseWhyNot #WorkLifeBalance #Overachiever</p>
        <p class="text-green-500 mb-1"><strong>!</strong> Prioritize like a pro with just a simple '!' and a number. !0 for most, !3 for least.</p>
        <p class="text-cyan-500"><strong>due:</strong> Set deadlines like a boss with our special due date magic word. Just add "due:" followed by your desired date in yyyy-mm-dd format. Or be lazy and use "due:today," "due:tomorrow,"</p>
      </div>
    </div>
    <div class="relative group">
      <div class="absolute -inset-0.5 bg-gradient-to-r from-green-700 via-indigo-700 to-cyan-700 animate-gradient-x blur-sm opacity-75 rounded-full group-hover:opacity-100 transition duration-1000 group-hover:duration-200 group-focus-within:opacity-100 group-focus-within:duration-200" />
      <div class="flex rounded-md shadow-sm bg-gray-800 rounded-full">
        <div class="relative flex flex-grow items-stretch focus-within:z-10">
          <input @keydown.space="extractSyntax()" @keydown.enter="currentlyEditedTask ? updateTask() : !isSearching ? createTask() : searchTasks()" v-model="userInput" ref="smartInput" type="text" name="smart" id="smart" class="block w-full rounded-none rounded-l-full border-gray-700 border-r-0 bg-gray-800 text-gray-50 placeholder-gray-600 pl-5 focus:outline-none focus:ring-0 focus:border-gray-700" placeholder="Write down your latest burden or ignore it. #pointless !3 due:today" />
        </div>
        <div v-if="!currentlyEditedTask" type="button" class="relative -ml-px inline-flex items-center space-x-2 border border-gray-700 border-l-0 bg-gray-800 pr-1 pl-2 py-1 text-sm font-medium text-gray-700">
          <Switch v-model="isSearching" :class="[isSearching ? 'bg-indigo-900' : 'bg-indigo-700', 'relative inline-flex h-8 w-16 flex-shrink-0 cursor-pointer rounded-full border-2 border-gray-700 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-0']">
            <span class="sr-only">Switch mode</span>
            <span :class="[isSearching ? 'translate-x-8' : 'translate-x-0', 'pointer-events-none relative inline-block h-7 w-7 transform rounded-full bg-gray-900 shadow ring-0 transition duration-200 ease-in-out']">
            <span :class="[isSearching ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200', 'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity']" aria-hidden="true">
              <PlusIcon class="h-5 w-5 text-gray-100" aria-hidden="true" />
            </span>
            <span :class="[isSearching ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100', 'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity']" aria-hidden="true">
              <MagnifyingGlassIcon class="h-5 w-5 text-gray-100" aria-hidden="true" />
            </span>
          </span>
          </Switch>
        </div>
        <button v-if="currentlyEditedTask" @click="clearEdit()" type="button" class="relative -ml-px inline-flex items-center space-x-2 w-24 flex justify-center border border-gray-700 bg-gray-800 px-4 py-2 text-sm font-medium text-gray-100 hover:bg-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500">
          Clear
        </button>
        <button @click="currentlyEditedTask ? updateTask() : !isSearching ? createTask() : searchTasks()" type="button" class="relative -ml-px inline-flex items-center space-x-2 w-24 flex justify-center rounded-r-full border border-gray-700 bg-gray-800 px-4 py-2 text-sm font-medium text-gray-100 hover:bg-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500">
          <span v-if="currentlyEditedTask">Save</span>
          <span v-else-if="!isSearching && !currentlyEditedTask">Create</span>
          <span v-else>Search</span>
        </button>
      </div>
    </div>
    <div class="mt-2">
      <PriorityBadge v-if="priority" :priority="priority" @removePriority="removePriority" />
      <DueDateBadge v-if="dueDate" :dueDate="dueDate" @removeDueDate="removeDueDate" />
      <TagsBadges v-if="tags.length > 0" :tags="tags" @removeTag="removeTag" />
    </div>
  </div>
</template>

<script setup>
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/vue/20/solid'
import { ref, watch } from 'vue'
import { useKeypress } from "vue3-keypress"
import { notify } from "notiwind"
import debounce from 'lodash.debounce'
import { useTaskStore } from "@/stores/task"
import { Switch } from '@headlessui/vue'
import PriorityBadge from "@/components/PriorityBadge.vue"
import DueDateBadge from "@/components/DueDateBadge.vue"
import TagsBadges from "@/components/TagsBadges.vue"

const taskStore = useTaskStore()

const isSyntaskGuideShown = ref(false)
const smartInput = ref('')
const isSearching = ref(false)
const userInput = ref('')
const currentlyEditedTask = ref(null)
const tags = ref([])
const priority = ref(null)
const dueDate = ref(null)

taskStore.$subscribe(() => {
  if (taskStore.currentlyEditedTask) {
    currentlyEditedTask.value = taskStore.currentlyEditedTask
    userInput.value = currentlyEditedTask.value.title
    tags.value = currentlyEditedTask.value.tags.map(tag => tag.name.en)
    priority.value = currentlyEditedTask.value.priority
    dueDate.value = currentlyEditedTask.value.due_date
    smartInput.value.focus({ preventScroll: true })
    scrollToTop()
  }
})

function updateTask() {
  if (userInput.value.trim() === '') {
    return
  }

  extractSyntax()

  taskStore.updateTask({
    id: currentlyEditedTask.value.id,
    title: userInput.value,
    priority: priority.value,
    due_date: dueDate.value,
    tags: tags.value,
  }).then((data) => {
    taskStore.resetEdit()
    currentlyEditedTask.value = null
    resetUserInput()
  })
}

function clearEdit() {
  taskStore.resetEdit()
  currentlyEditedTask.value = null
  resetUserInput()
}

function createTask() {
  if (userInput.value.trim() === '') {
    return
  }

  extractSyntax()

  taskStore.createTask({
    title: userInput.value,
    priority: priority.value,
    due_date: dueDate.value,
    tags: tags.value,
  })

  resetUserInput()
}

watch(userInput, debounce(() => {
  if (isSearching.value) {
    searchTasks()
  }
}, 500))



function searchTasks() {
  extractSyntax()

  taskStore.searchTasks({
    title: userInput.value,
    priority: priority.value,
    due_date: dueDate.value,
    tags: tags.value,
  })
}

function deleteAllTasks() {
  taskStore.deleteAllTasks().then((data) => {
    resetUserInput()

    notify({
      group: "success",
      title: "Success",
      text: data.data.message
    }, 4000)
  })
}

function extractSyntax() {
  const lastWord = userInput.value.split(' ').pop()

  if (lastWord.startsWith('#')) {
    if (lastWord.length === 1) {
      removeWordFromUserInput(lastWord)
      return
    }

    if (tags.value.includes(lastWord.replace('#', ''))) {
      removeWordFromUserInput(lastWord)
      return
    }

    tags.value.push(lastWord.replace('#', ''))
    removeWordFromUserInput(lastWord)
  } else if (lastWord.startsWith('!')) {
    if (lastWord.length === 1) {
      removeWordFromUserInput(lastWord)
      return
    }

    if (isNaN(lastWord.replace('!', '')) || lastWord.replace('!', '') < 0 || lastWord.replace('!', '') > 3) {
      removeWordFromUserInput(lastWord)
      return
    }

    priority.value = lastWord.replace('!', '')
    removeWordFromUserInput(lastWord)
  } else if (lastWord.startsWith('due:')) {
    if (lastWord.length === 4) {
      removeWordFromUserInput(lastWord)
      return
    }

    // smart date parsing
    if (lastWord.replace('due:', '') === 'today') {
      dueDate.value = new Date().toISOString().split('T')[0]
      removeWordFromUserInput(lastWord)
      return
    } else if (lastWord.replace('due:', '') === 'tomorrow') {
      dueDate.value = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0]
      removeWordFromUserInput(lastWord)
      return
    } else if (lastWord.replace('due:', '') === 'next-week') {
      dueDate.value = new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split('T')[0]
      removeWordFromUserInput(lastWord)
      return
    } else if (lastWord.replace('due:', '') === 'next-month') {
      dueDate.value = new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0]
      removeWordFromUserInput(lastWord)
      return
    } else if (lastWord.replace('due:', '') === 'next-year') {
      dueDate.value = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0]
      removeWordFromUserInput(lastWord)
      return
    }

    if (!lastWord.replace('due:', '').match(/^\d{4}-\d{2}-\d{2}$/) || !Date.parse(lastWord.replace('due:', '')) || new Date(lastWord.replace('due:', '')) < new Date()) {
      removeWordFromUserInput(lastWord)
      return
    }

    dueDate.value = lastWord.replace('due:', '')
    removeWordFromUserInput(lastWord)
  }
}

function removeTag(tag) {
  tags.value = tags.value.filter((t) => t !== tag)
}

function removePriority() {
  priority.value = null
}

function removeDueDate() {
  dueDate.value = null
}

function removeWordFromUserInput(word) {
  userInput.value = userInput.value.replace(word, '').trim()
}

function resetUserInput() {
  userInput.value = ''
  tags.value = []
  priority.value = null
  dueDate.value = null

  if (isSearching.value) {
    taskStore.fetchTasks()
  }

  if (currentlyEditedTask.value !== null) {
    currentlyEditedTask.value = null
    taskStore.resetEdit()
  }
}

function switchToNewTask() {
  if (isSearching.value) {
    taskStore.fetchTasks()
  }
  isSearching.value = false
  smartInput.value.focus()
}

function switchToSearch() {
  isSearching.value = true
  smartInput.value.focus()

  if (userInput.value.length > 0 || tags.value.length > 0 || priority.value !== null || dueDate.value !== null) {
    searchTasks()
  }
}

useKeypress({
  keyEvent: "keydown",
  keyBinds: [
    {
      keyCode: 83, // "S" is pressed
      modifiers: ["shiftKey"],
      preventDefault: true,
      success: switchToSearch,
    },
    {
      keyCode: 78, // "N" is pressed
      modifiers: ["shiftKey"],
      preventDefault: true,
      success: switchToNewTask,
    },
    {
      keyCode: 82, // "R" is pressed
      modifiers: ["shiftKey"],
      preventDefault: true,
      success: resetUserInput,
    },
    {
      keyCode: 87, // "W" is pressed
      modifiers: ["shiftKey"],
      preventDefault: true,
      success: deleteAllTasks,
    },
  ],
})

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>