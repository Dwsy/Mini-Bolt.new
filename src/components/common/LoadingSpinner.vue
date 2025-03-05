<script setup>
defineProps({
  size: {
    type: String,
    default: 'md' // sm, md, lg
  },
  color: {
    type: String,
    default: 'primary' // primary, secondary, accent, neutral
  }
})
</script>

<template>
  <div 
    class="loading-spinner"
    :class="{
      'w-4 h-4': size === 'sm',
      'w-8 h-8': size === 'md',
      'w-12 h-12': size === 'lg',
      'text-primary': color === 'primary',
      'text-secondary': color === 'secondary',
      'text-accent': color === 'accent',
      'text-neutral-content': color === 'neutral'
    }"
  >
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      class="animate-spin w-full h-full"
    >
      <circle 
        class="opacity-25" 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="currentColor" 
        stroke-width="4" 
        fill="none"
      ></circle>
      <path 
        class="opacity-75" 
        fill="currentColor" 
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  </div>
</template>