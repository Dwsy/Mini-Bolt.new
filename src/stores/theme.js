import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useThemeStore = defineStore("theme", () => {
  // 检查系统是否偏好暗色模式
  const prefersDarkScheme =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  // 从本地存储获取用户之前设置的主题，如果没有则使用系统偏好
  const savedTheme = localStorage.getItem("theme");

  // 状态
  const isDarkTheme = ref(
    savedTheme ? savedTheme === "dark" : prefersDarkScheme
  );

  // 主题切换功能
  function toggleTheme() {
    isDarkTheme.value = !isDarkTheme.value;
    localStorage.setItem("theme", isDarkTheme.value ? "dark" : "light");
  }

  // 设置特定主题
  function setTheme(theme) {
    isDarkTheme.value = theme === "dark";
    localStorage.setItem("theme", theme);
  }

  // 重置为系统默认主题
  function resetToSystemTheme() {
    localStorage.removeItem("theme");
    isDarkTheme.value = prefersDarkScheme;
  }

  // 监听系统主题变化
  if (window.matchMedia) {
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );
    darkModeMediaQuery.addEventListener("change", (e) => {
      // 只有当用户没有手动设置偏好时才更新
      if (!localStorage.getItem("theme")) {
        isDarkTheme.value = e.matches;
      }
    });
  }

  // 监听isDarkTheme的变化以应用主题类
  watch(
    isDarkTheme,
    (newValue) => {
      if (newValue) {
        document.documentElement.classList.add("dark");
        document.documentElement.setAttribute("data-theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        document.documentElement.setAttribute("data-theme", "light");
      }
    },
    { immediate: true }
  );

  return {
    isDarkTheme,
    toggleTheme,
    setTheme,
    resetToSystemTheme,
  };
});
