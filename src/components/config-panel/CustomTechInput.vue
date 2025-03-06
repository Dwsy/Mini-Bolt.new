<script setup>
import { computed } from "vue";

const props = defineProps({
  customTech: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:customTech"]);

// 本地响应式变量，与父组件的customTech双向绑定
const localCustomTech = computed({
  get: () => props.customTech,
  set: (value) => emit("update:customTech", value),
});
</script>

<template>
  <div
    class="p-3 rounded-lg bg-white/90 dark:bg-gray-800/90 border border-gray-100/50 dark:border-gray-700/30"
  >
    <h4 class="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
      自定义技术 (用逗号分隔)
    </h4>
    <div class="relative">
      <input
        v-model="localCustomTech"
        type="text"
        placeholder="例如: React Native, Flutter, Unity..."
        class="w-full px-3 py-2 rounded-md bg-gray-50/80 dark:bg-gray-700/80 border border-gray-200/80 dark:border-gray-600/50 focus:ring-1 focus:ring-primary/50 focus:border-primary text-xs text-gray-800 dark:text-gray-100 shadow-sm"
      />
    </div>
  </div>
</template>
