<script setup>
import { ref } from "vue";

const props = defineProps({
  techStackCombinations: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["combination-selected"]);

const isVisible = ref(true);

// 选择技术栈组合
const selectCombination = (combo) => {
  emit("combination-selected", combo);
};
</script>

<template>
  <div
    class="mb-4 rounded-lg border border-primary/20 bg-white/90 dark:bg-gray-800/90 shadow-sm overflow-hidden transition-all duration-300"
  >
    <!-- 标题栏（可点击折叠/展开） -->
    <div
      @click="isVisible = !isVisible"
      class="p-3 bg-gradient-to-r from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 flex items-center justify-between cursor-pointer"
    >
      <div class="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 text-primary mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"
          />
        </svg>
        <h4 class="text-sm font-semibold text-gray-800 dark:text-white">
          技术栈组合一键选择
        </h4>
      </div>
      <div class="flex items-center text-xs text-gray-500 dark:text-gray-400">
        <span>快速选择预设技术组合</span>
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
      <div
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2"
      >
        <button
          v-for="combo in techStackCombinations"
          :key="combo.name"
          @click="selectCombination(combo.name)"
          class="p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary/30 hover:bg-primary/5 dark:hover:bg-primary/10 transition-all flex flex-col items-center text-center group"
        >
          <div class="w-6 h-6 mb-1 flex items-center justify-center">
            <img
              :src="`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${combo.icon}`"
              :alt="combo.name"
              class="w-5 h-5 group-hover:scale-110 transition-transform"
              onerror="this.style.display='none'"
            />
          </div>
          <span
            class="text-xs font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary"
            >{{ combo.name }}</span
          >
        </button>
      </div>
    </div>
  </div>
</template>
