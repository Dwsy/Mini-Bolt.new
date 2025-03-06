<script setup>
import { useThemeStore } from "@/stores/theme";
import { ref, computed } from "vue";

const themeStore = useThemeStore();
const showOptions = ref(false);

// 主题模式
const themeMode = computed(() => {
  if (!localStorage.getItem("theme")) return "system";
  return themeStore.isDarkTheme ? "dark" : "light";
});

// 切换主题
const toggleTheme = () => {
  themeStore.toggleTheme();
};

// 设置特定主题
const setTheme = (theme) => {
  if (theme === "system") {
    themeStore.resetToSystemTheme();
  } else {
    themeStore.setTheme(theme);
  }
  showOptions.value = false;
};

// 检测系统是否支持暗黑模式
const supportsColorScheme = computed(() => {
  return (
    window.matchMedia &&
    (window.matchMedia("(prefers-color-scheme: dark)").matches ||
      window.matchMedia("(prefers-color-scheme: light)").matches)
  );
});
</script>

<template>
  <div class="relative">
    <!-- 主题切换按钮 -->
    <button
      @click="showOptions = !showOptions"
      class="btn btn-circle btn-sm btn-ghost transition-all duration-300 ease-out"
      :title="themeStore.isDarkTheme ? '当前是深色模式' : '当前是浅色模式'"
    >
      <!-- 月亮图标 (深色模式) -->
      <svg
        v-if="themeStore.isDarkTheme"
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 text-yellow-300 transform transition-transform duration-500 ease-bounce-in"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
        />
      </svg>

      <!-- 太阳图标 (浅色模式) -->
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 text-yellow-500 transform rotate-0 transition-transform duration-500 ease-bounce-in"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
          clip-rule="evenodd"
        />
      </svg>
    </button>

    <!-- 主题选项菜单 -->
    <div
      v-if="showOptions"
      class="absolute right-0 mt-2 w-40 z-50 rounded-lg overflow-hidden shadow-lg bg-base-100 dark:bg-base-200 transition-all duration-300 ease-out"
      style="backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px)"
    >
      <div class="p-1">
        <!-- 浅色模式 -->
        <button
          @click="setTheme('light')"
          class="flex items-center w-full px-3 py-2 text-sm rounded-md transition-colors duration-200 hover:bg-base-200 dark:hover:bg-base-300"
          :class="{ 'bg-primary/10': themeMode === 'light' }"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              clip-rule="evenodd"
            />
          </svg>
          浅色
        </button>

        <!-- 深色模式 -->
        <button
          @click="setTheme('dark')"
          class="flex items-center w-full px-3 py-2 text-sm rounded-md transition-colors duration-200 hover:bg-base-200 dark:hover:bg-base-300"
          :class="{ 'bg-primary/10': themeMode === 'dark' }"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
            />
          </svg>
          深色
        </button>

        <!-- 系统模式（如果支持） -->
        <button
          v-if="supportsColorScheme"
          @click="setTheme('system')"
          class="flex items-center w-full px-3 py-2 text-sm rounded-md transition-colors duration-200 hover:bg-base-200 dark:hover:bg-base-300"
          :class="{ 'bg-primary/10': themeMode === 'system' }"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          跟随系统
        </button>
      </div>
    </div>
  </div>

  <!-- 点击外部关闭选项菜单 -->
  <div
    v-if="showOptions"
    class="fixed inset-0 z-40"
    @click="showOptions = false"
  ></div>
</template>

<style scoped>
.ease-bounce-in {
  transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
</style>
