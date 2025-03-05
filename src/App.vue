<script setup>
import { RouterView } from 'vue-router'
import { useThemeStore } from '@/stores/theme'
import NotificationComponent from '@/components/common/NotificationComponent.vue'

const themeStore = useThemeStore()
</script>

<template>
  <div :class="{ 'dark': themeStore.isDarkTheme }">
    <NotificationComponent />
    <RouterView />
  </div>
</template>