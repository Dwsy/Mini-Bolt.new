import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useThemeStore = defineStore("theme", () => {
  // Check system preference for dark mode
  const prefersDarkScheme =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  var savedTheme = localStorage.getItem("theme");
  savedTheme = "light"; //dark 未适配
  // State
  const isDarkTheme = ref(
    savedTheme ? savedTheme === "dark" : prefersDarkScheme
  );

  // Actions
  function toggleTheme() {
    isDarkTheme.value = !isDarkTheme.value;
    localStorage.setItem("theme", isDarkTheme.value ? "dark" : "light");
  }

  // Listen for system theme changes
  if (window.matchMedia) {
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );
    darkModeMediaQuery.addEventListener("change", (e) => {
      // Only update if user hasn't manually set a preference
      if (!localStorage.getItem("theme")) {
        isDarkTheme.value = e.matches;
      }
    });
  }

  // Watch for changes to apply the theme class
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
  };
});
