<template>
  <div
    class="font-mono inline-flex items-center rounded-full bg-cyan-900 border border-cyan-700 py-0.5 pl-2.5 pr-1 mr-2 mt-2 text-sm font-medium text-cyan-200"
    :class="{ 'pr-2.5': !isRemovable }"
  >
    Due on {{ dueDate }}
    <button v-if="isRemovable" @click="$emit('removeDueDate')" type="button" class="ml-1 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-cyan-400 hover:bg-cyan-200 hover:text-cyan-900 focus:bg-cyan-500 focus:text-cyan-900 focus:outline-none">
      <span class="sr-only">Remove {{ dueDate }} option</span>
      <svg class="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
        <path stroke-linecap="round" stroke-width="1.5" d="M1 1l6 6m0-6L1 7" />
      </svg>
    </button>
  </div>
</template>
<script setup>
defineEmits(['removeDueDate'])
  defineProps({
    dueDate: String,
    isRemovable: {
      required: false,
      type: Boolean,
      default: true,
    }
  })
</script>