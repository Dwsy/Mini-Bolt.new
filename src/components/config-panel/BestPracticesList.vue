<script setup>
import { ref } from "vue";

defineProps({
  bestPractices: {
    type: Array,
    required: true,
  },
});

const isVisible = ref(false);
</script>

<template>
  <div
    v-if="bestPractices.length > 0"
    class="mb-4 rounded-lg border border-green-300/30 bg-white/90 dark:bg-gray-800/90 shadow-sm overflow-hidden transition-all duration-300"
  >
    <!-- 标题栏（可点击折叠/展开） -->
    <div
      @click="isVisible = !isVisible"
      class="p-3 bg-gradient-to-r from-green-50 to-green-100/80 dark:from-green-900/20 dark:to-green-800/20 flex items-center justify-between cursor-pointer"
    >
      <div class="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 text-green-500 dark:text-green-400 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <h4 class="text-sm font-semibold text-gray-800 dark:text-white">
          已选技术栈最佳实践 ({{ bestPractices.length }})
        </h4>
      </div>
      <div class="flex items-center text-xs text-gray-500 dark:text-gray-400">
        <span>添加到提示词中的最佳实践</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 ml-2 transition-transform duration-300"
          :class="isVisible ? 'transform rotate-180' : ''"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    </div>

    <!-- 内容区（可折叠） -->
    <div
      v-show="isVisible"
      class="p-3 border-t border-gray-100 dark:border-gray-700/30 transition-all duration-300"
    >
      <div class="space-y-1.5 max-h-48 overflow-y-auto pr-1">
        <div
          v-for="(practice, index) in bestPractices"
          :key="index"
          class="text-sm text-gray-700 dark:text-gray-300 p-2 bg-white/50 dark:bg-gray-800/50 rounded border border-gray-100/80 dark:border-gray-700/50 flex"
        >
          <span
            class="text-green-600 dark:text-green-400 mr-2 font-medium shrink-0"
            >{{ index + 1 }}.</span
          >
          <span>{{ practice }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
