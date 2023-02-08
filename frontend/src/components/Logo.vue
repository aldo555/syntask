<template>
  <router-link to="/" class="text-gray-50 text-4xl font-mono font-medium tracking-wide">
    <span class="text-indigo-500">{#</span>
    <span @mouseover="animate()" @mouseleave="endAnimation()">{{name}}</span>
    <span class="text-indigo-500">}</span>
  </router-link>
</template>
<script setup>
import {onUnmounted, ref} from 'vue'

const name = ref('syntask')
const interval = ref(null)
const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
function animate() {
  if (interval.value) return

  const originalName = name.value
  let iterations = 0

  interval.value = setInterval(() => {
    name.value = name.value.split('').map((char, index) => {
      if (index < iterations) return originalName[index]

      return characters[Math.floor(Math.random() * characters.length)]
    }).join('')

    if (iterations >= name.value.length) {
      clearInterval(interval.value)
      interval.value = null
    }

    iterations += 1/7
  }, 30)
}

onUnmounted(() => {
  if (interval.value) {
    clearInterval(interval.value)
  }
})

function endAnimation() {
  // clearInterval(interval.value)
  // console.log(interval.value)
  // name.value = 'syntask'
}
</script>