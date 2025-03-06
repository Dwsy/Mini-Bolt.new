<script setup>
import { computed } from "vue";
import MvpModeToggle from "./MvpModeToggle.vue";

const props = defineProps({
  requirements: {
    type: String,
    default: "",
  },
  isMvpMode: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:requirements", "update:isMvpMode"]);

// 本地响应式变量，与父组件双向绑定
const localRequirements = computed({
  get: () => props.requirements,
  set: (value) => emit("update:requirements", value),
});

const localIsMvpMode = computed({
  get: () => props.isMvpMode,
  set: (value) => emit("update:isMvpMode", value),
});
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
              d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"
            />
            <path
              fill-rule="evenodd"
              d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
        项目需求
      </h3>
      <p class="text-sm text-gray-500 dark:text-gray-400 mb-3">
        请详细描述您的项目功能需求
      </p>
      <textarea
        v-model="localRequirements"
        placeholder="例如：我需要一个具有用户登录、任务管理和数据分析功能的网站..."
        rows="20"
        class="w-full px-4 py-3 rounded-lg bg-gray-50/80 dark:bg-gray-700/80 border border-gray-200/80 dark:border-gray-600/50 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 outline-none text-gray-800 dark:text-gray-100 resize-none shadow-sm"
      ></textarea>

      <!-- MVP模式组件 -->
      <MvpModeToggle v-model="localIsMvpMode" />
    </div>
  </div>
</template>
