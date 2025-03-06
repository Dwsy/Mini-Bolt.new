<script setup>
import { computed } from "vue";

const props = defineProps({
  designPrompts: {
    type: Array,
    required: true,
  },
  selectedDesignPrompt: {
    type: String,
    default: "",
  },
  customThemeDescription: {
    type: String,
    default: "",
  },
});

const emit = defineEmits([
  "update:selectedDesignPrompt",
  "update:customThemeDescription",
]);

// 本地响应式变量，与父组件双向绑定
const localSelectedDesignPrompt = computed({
  get: () => props.selectedDesignPrompt,
  set: (value) => emit("update:selectedDesignPrompt", value),
});

const localCustomThemeDescription = computed({
  get: () => props.customThemeDescription,
  set: (value) => emit("update:customThemeDescription", value),
});

const selectDesignPrompt = (prompt) => {
  // 如果点击已选中的设计风格，则取消选择
  if (localSelectedDesignPrompt.value === prompt.name) {
    localSelectedDesignPrompt.value = "";
    return;
  }

  // 否则选择新的设计风格
  localSelectedDesignPrompt.value = prompt.name;
  if (!localCustomThemeDescription.value) {
    localCustomThemeDescription.value = prompt.description;
  }
};
</script>

<template>
  <div class="space-y-5">
    <div>
      <h3
        class="text-lg font-bold text-gray-800 dark:text-white mb-2 flex items-center"
      >
        <span class="text-primary mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z"
            />
          </svg>
        </span>
        设计风格
      </h3>
      <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
        选择一种您喜欢的设计风格
      </p>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div
          v-for="prompt in designPrompts"
          :key="prompt.name"
          @click="selectDesignPrompt(prompt)"
          class="cursor-pointer rounded-lg border p-4 transition-all duration-300 hover:shadow-lg relative overflow-hidden group"
          :class="[
            localSelectedDesignPrompt === prompt.name
              ? 'border-primary/30 bg-primary/5 dark:bg-primary/10 shadow-md shadow-primary/10'
              : 'border-gray-200/80 dark:border-gray-700/50 bg-white/90 dark:bg-gray-800/80 hover:border-gray-300/80 dark:hover:border-gray-600/80',
          ]"
        >
          <div
            class="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          ></div>
          <div class="relative">
            <h4
              class="font-medium text-gray-800 dark:text-white mb-1 group-hover:text-primary transition-colors duration-300"
            >
              {{ prompt.name }}
            </h4>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              {{ prompt.description }}
            </p>
            <div
              v-if="localSelectedDesignPrompt === prompt.name"
              class="absolute top-0 right-0 text-primary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
