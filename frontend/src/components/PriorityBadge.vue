<template>
  <div
    v-if="priority"
    class="inline-flex items-center rounded-full bg-indigo-900 border border-indigo-700 py-0.5 pl-2.5 pr-1 mr-2 mt-2 text-sm font-medium"
    :class="{
      'bg-red-900': priority === '0',
      'text-red-200': priority === '0',
      'border-red-700': priority === '0',
      'bg-orange-900': priority === '1',
      'text-orange-200': priority === '1',
      'border-orange-700': priority === '1',
      'bg-yellow-900': priority === '2',
      'text-yellow-200': priority === '2',
      'border-yellow-700': priority === '2',
      'bg-green-900': priority === '3',
      'text-green-200': priority === '3',
      'border-green-700': priority === '3',
      'pr-2.5': !isRemovable,
    }"
  >
    {{ priority }}
    <button
      v-if="isRemovable"
      @click="$emit('removePriority')"
      type="button"
      class="ml-1 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:bg-indigo-500 focus:text-white focus:outline-none"
      :class="{
        'text-red-400': priority === '0',
        'hover:bg-red-500': priority === '0',
        'hover:text-red-900': priority === '0',
        'focus:bg-red-500': priority === '0',
        'focus:text-red-900': priority === '0',
        'text-orange-400': priority === '1',
        'hover:bg-orange-500': priority === '1',
        'hover:text-orange-900': priority === '1',
        'focus:bg-orange-500': priority === '1',
        'focus:text-orange-900': priority === '1',
        'text-yellow-400': priority === '2',
        'hover:bg-yellow-500': priority === '2',
        'hover:text-yellow-900': priority === '2',
        'focus:bg-yellow-500': priority === '2',
        'focus:text-yellow-900': priority === '2',
        'text-green-400': priority === '3',
        'hover:bg-green-500': priority === '3',
        'hover:text-green-900': priority === '3',
        'focus:bg-green-500': priority === '3',
        'focus:text-green-900': priority === '3',
      }"
    >
      <span class="sr-only">Remove {{ priority }} option</span>
      <svg class="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
        <path stroke-linecap="round" stroke-width="1.5" d="M1 1l6 6m0-6L1 7" />
      </svg>
    </button>
  </div>
</template>

<script setup>
  defineEmits(['removePriority'])
  defineProps({
    priority: String,
    isRemovable: {
      required: false,
      type: Boolean,
      default: true,
    }
  })
</script>