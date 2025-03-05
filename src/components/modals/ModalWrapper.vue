<script setup>
defineProps({
  title: {
    type: String,
    default: 'Modal'
  }
})

const emit = defineEmits(['close'])
</script>

<template>
  <div class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
    <div class="glass-effect gradient-border rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-xl animate-fadeIn">
      <div class="p-4 border-b border-base-300 flex justify-between items-center">
        <h3 class="text-xl font-medium text-primary">{{ title }}</h3>
        <div class="flex items-center space-x-3">
          <slot name="header-actions"></slot>
          <button @click="emit('close')" class="btn btn-ghost btn-sm text-base-content/60 hover:text-base-content">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      
      <slot></slot>
      
      <div v-if="$slots.footer" class="p-4 border-t border-base-300">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-fadeIn {
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>