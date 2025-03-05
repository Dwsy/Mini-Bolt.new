<script setup>
defineProps({
  title: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div class="glass-effect gradient-border rounded-lg p-3.5 hover-lift relative overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 opacity-50 pointer-events-none"></div>
    <div class="relative z-10">
      <h2 v-if="title || icon" class="text-lg font-semibold text-primary mb-3.5 flex items-center">
        <span v-if="icon" v-html="icon" class="mr-2 text-primary/90"></span>
        {{ title }}
      </h2>
      <slot></slot>
    </div>
  </div>
</template>