<template>
  <div
    v-for="tag in tags"
    :key="tag"
    class="inline-flex items-center rounded-full bg-indigo-900 border border-indigo-700 py-0.5 pl-2.5 pr-1 mr-2 mt-2 text-sm font-medium text-indigo-200"
    :class="{ 'pr-2.5': !isRemovable }"
  >
    {{ tag }}
    <button v-if="isRemovable" @click="$emit('removeTag', tag)" type="button" class="ml-1 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-indigo-400 hover:bg-indigo-500 hover:text-indigo-900 focus:bg-indigo-500 focus:text-indigo-900 focus:outline-none">
      <span class="sr-only">Remove {{ tag }} option</span>
      <svg class="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
        <path stroke-linecap="round" stroke-width="1.5" d="M1 1l6 6m0-6L1 7" />
      </svg>
    </button>
  </div>
</template>
<script setup>
  defineEmits(['removeTag'])
  defineProps({
    tags: Array,
    isRemovable: {
      required: false,
      type: Boolean,
      default: true,
    }
  })
</script>