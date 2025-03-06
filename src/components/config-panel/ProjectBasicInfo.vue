<script setup>
import { ref, computed } from "vue";
import ProjectNameSuggestions from "./ProjectNameSuggestions.vue";
import { projectNamesList } from "@/config/projectConfig";

const props = defineProps({
  projectName: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:projectName"]);

// 检测用户语言环境
const getUserLanguage = () => {
  const userLang = navigator.language || navigator.userLanguage;
  return userLang.toLowerCase().startsWith("zh") ? "zh" : "en";
};

// 本地响应式变量，与父组件的projectName双向绑定
const localProjectName = computed({
  get: () => props.projectName,
  set: (value) => emit("update:projectName", value),
});

// 处理名称选择
const handleNameSelected = (name) => {
  localProjectName.value = name;
};
</script>

<template>
  <div class="space-y-5">
    <div class="mb-6">
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
              fill-rule="evenodd"
              d="M5 2a1 1 0 011 1h8a1 1 0 011 1v2H5V3a1 1 0 011-1zm10 6V5a1 1 0 00-1-1H6a1 1 0 00-1 1v3h10zm-1 1H6v7a1 1 0 001 1h6a1 1 0 001-1v-7z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
        {{ getUserLanguage() === "zh" ? "项目名称" : "Project Name" }}
      </h3>
      <p class="text-sm text-gray-500 dark:text-gray-400 mb-3">
        {{
          getUserLanguage() === "zh"
            ? "为您的项目起一个简洁明了的名称"
            : "Give your project a clear and concise name"
        }}
      </p>
      <input
        v-model="localProjectName"
        type="text"
        :placeholder="
          getUserLanguage() === 'zh' ? '输入项目名称' : 'Enter project name'
        "
        class="w-full px-4 py-3 rounded-lg bg-gray-50/80 dark:bg-gray-700/80 border border-gray-200/80 dark:border-gray-600/50 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 outline-none text-gray-800 dark:text-gray-100 shadow-sm"
      />

      <!-- 项目名称弹幕效果 -->
      <ProjectNameSuggestions
        :project-names-list="projectNamesList"
        @name-selected="handleNameSelected"
      />
    </div>
  </div>
</template>
