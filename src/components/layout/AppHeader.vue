<script setup>
import { useThemeStore } from "@/stores/theme";
import ThemeSwitch from "@/components/common/ThemeSwitch.vue";

const themeStore = useThemeStore();

const emit = defineEmits([
  "show-template-manager",
  "show-history-modal",
  "show-parse-history-modal",
]);
</script>

<template>
  <header class="mb-5">
    <div class="container mx-auto px-4 py-4">
      <div class="flex flex-col md:flex-row items-center justify-between">
        <!-- 左侧Logo和标题 -->
        <div class="flex items-center space-x-3 mb-3 md:mb-0">
          <div
            class="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div>
            <h1
              class="text-2xl font-bold text-gray-900 dark:text-white flex items-center"
            >
              Mini-Bolt<span class="text-primary">.new</span>
            </h1>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              Claude3.7驱动的项目生成器
            </p>
          </div>
        </div>

        <!-- 中间标语 -->
        <div
          class="hidden md:flex items-center bg-gradient-to-r from-primary/10 to-secondary/10 px-4 py-2 rounded-full mb-3 md:mb-0"
        >
          <span class="animate-pulse text-primary mr-2">✨</span>
          <p class="text-sm font-medium text-gray-700 dark:text-gray-200">
            智能提示词引擎 + 解析为项目文件 = 让Claude3.7为你打造完美项目
          </p>
        </div>

        <!-- 右侧功能按钮 -->
        <div class="flex items-center space-x-3">
          <div
            class="flex items-center bg-white dark:bg-gray-800 rounded-full shadow-md overflow-hidden p-1"
          >
            <button
              @click="emit('show-template-manager')"
              class="px-3 py-1.5 text-xs rounded-full flex items-center space-x-1 font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-3.5 w-3.5 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6z"
                />
              </svg>
              <span>提示词模板</span>
            </button>

            <button
              @click="emit('show-history-modal')"
              class="px-3 py-1.5 text-xs rounded-full flex items-center space-x-1 font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-3.5 w-3.5 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>提示词历史</span>
            </button>

            <button
              @click="emit('show-parse-history-modal')"
              class="px-3 py-1.5 text-xs rounded-full flex items-center space-x-1 font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-3.5 w-3.5 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span>解析记录</span>
            </button>

            <a
              href="https://github.com/Dwsy/Mini-Bolt.new"
              target="_blank"
              rel="noopener noreferrer"
              class="px-3 py-1.5 text-xs rounded-full flex items-center space-x-1 font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-3.5 w-3.5 text-primary"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                />
              </svg>
              <span>GitHub</span>
            </a>
          </div>

          <ThemeSwitch />
        </div>
      </div>
    </div>

    <!-- 移动端标语 -->
    <div class="md:hidden flex justify-center mt-1 mb-3">
      <div
        class="bg-gradient-to-r from-primary/10 to-secondary/10 px-4 py-2 rounded-full flex items-center"
      >
        <span class="animate-pulse text-primary mr-2">✨</span>
        <p class="text-xs font-medium text-gray-700 dark:text-gray-200">
          一键生成完美项目，立刻可以运行！
        </p>
      </div>
    </div>
  </header>
</template>

<style scoped>
@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}
</style>
