export const files = {
  'index.html': {
    file: {
      contents: `<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/favicon.ico" />
    <link rel="icon" type="image/svg+xml" href="/src/assets/logo.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Mini-Bolt | Claude代码生成助手</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>`,
    },
  },
  'package.json': {
    file: {
      contents: `{
  "name": "mini-bolt.new",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs --fix --ignore-path .gitignore"
  },
  "dependencies": {
    "jszip": "^3.10.1",
    "marked": "^9.1.5",
    "pinia": "^2.1.7",
    "vue": "^3.3.4",
    "vue-router": "^4.2.5",
    "@webcontainer/api": "^1.1.0"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^4.4.0",
    "autoprefixer": "^10.4.16",
    "daisyui": "^3.9.4",
    "eslint": "^8.49.0",
    "eslint-plugin-vue": "^9.17.0",
    "postcss": "^8.4.31",
    "tailwindcss": "^3.3.5",
    "vite": "^4.4.11"
  },
  "pnpm": {
    "onlyBuiltDependencies": [
      "esbuild",
      "vue-demi"
    ]
  }
}`,
    },
  },
  'vite.config.js': {
    file: {
      contents: `import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
  },
})`,
    },
  },
  'src': {
    directory: {
      'main.js': {
        file: {
          contents: `import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')`,
        },
      },
      'App.vue': {
        file: {
          contents: `<script setup>
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
</template>`,
        },
      },
      'router': {
        directory: {
          'index.js': {
            file: {
              contents: `import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeVew
    }
  ]
})

export default router`,
            },
          },
        },
      },
      'views': {
        directory: {
          'HomeView.vue': {
            file: {
              contents: `<template>
  <div>
    <h1>Hello from WebContainer!</h1>
  </div>
</template>`,
            },
          },
        },
      },
      'assets': {
        directory: {
          'main.css': {
            file: {
              contents: `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  /* 主题颜色 - 新的温暖配色方案 */
  --primary-color: #F5F3EA;    /* 翡翠绿 */
  --secondary-color: #6D4C41;  /* 温暖褐色 */
  --accent-color: #F59E0B;     /* 琥珀黄 */
  --background-dark: #1F2937;
  --card-dark: #1E293B;
  --text-light: #f9fafb;
  --text-gray: #9ca3af;

  /* 浅色主题颜色 - Claude风格 */
  --background-light: #F5F3EA;  /* Claude经典米色背景 */
  --card-light: #ffffff;
  --claude-message-bg: #F5F5F0; /* 浅绿灰色消息背景 */
  --user-message-bg: #F0F9F6;   /* 浅绿色用户消息背景 */
  --text-dark: #1A1A1A;
  --text-gray-dark: #4b5563;
}

html, body {
  @apply min-h-screen font-sans text-sm antialiased;
}

body {
  @apply bg-neutral text-neutral-content transition-colors duration-300;
}

body.light {
  background-color: var(--background-light);
  color: var(--text-dark);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23d0cbbf' fill-opacity='0.1' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E");
}

/* 高级毛玻璃效果 */
.glass-effect {
  @apply relative dark:bg-base-100/70 bg-white/85 backdrop-blur-lg border border-white/30 dark:border-white/10 shadow-glass-light dark:shadow-glass-dark;
}

.glass-effect::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  border-radius: inherit;
  background: linear-gradient(120deg, rgba(255,255,255,0.3), rgba(255,255,255,0.1));
  opacity: 0.2;
  pointer-events: none;
}

.dark .glass-effect::after {
  background: linear-gradient(120deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
  opacity: 0.1;
}

.gradient-border {
  @apply relative rounded-lg overflow-hidden;
}

.gradient-border::before {
  content: '';
  @apply absolute inset-0 p-px rounded-lg pointer-events-none;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color), var(--accent-color));
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0.7;
}

.custom-scrollbar::-webkit-scrollbar {
  @apply w-1.5 h-1.5;
}

.custom-scrollbar::-webkit-scrollbar-track {
  @apply dark:bg-base-300/30 bg-base-200/30 rounded-full;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  @apply bg-primary/40 rounded-full;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  @apply bg-primary/60;
}

.glow-effect {
  @apply shadow-[0_0_12px_rgba(138,122,255,0.4)];
}

.fade-enter-active, .fade-leave-active {
  @apply transition-all duration-300 ease-in-out;
}
.fade-enter-from, .fade-leave-to {
  @apply opacity-0 transform scale-95;
}

/* 按钮悬停效果 */
.btn {
  @apply transition-all duration-200 ease-in-out transform hover:scale-[1.02] active:scale-[0.98];
}

/* 卡片悬停效果 */
.hover-lift {
  @apply transition-all duration-300 ease-in-out hover:translate-y-[-2px] hover:shadow-lg;
}

/* Markdown 样式 */
.markdown-preview {
  @apply text-base-content leading-relaxed text-sm;
}

.markdown-preview h1 {
  @apply text-xl font-bold mt-5 mb-3 pb-1 border-b border-base-300/50 text-primary;
}

.markdown-preview h2 {
  @apply text-lg font-semibold mt-4 mb-2 text-primary;
}

.markdown-preview h3 {
  @apply text-base font-semibold mt-3 mb-2;
}

.markdown-preview h4 {
  @apply text-sm font-semibold mt-2 mb-1;
}

.markdown-preview p {
  @apply mb-3;
}

.markdown-preview ul, .markdown-preview ol {
  @apply mb-3 pl-5;
}

.markdown-preview li {
  @apply mb-1;
}

.markdown-preview blockquote {
  @apply border-l-2 border-primary/70 pl-3 my-3 py-1.5 bg-primary/5 rounded-r italic;
}

.markdown-preview pre {
  @apply bg-base-300/60 p-3 rounded-md mb-3 overflow-x-auto text-xs;
}

.markdown-preview code {
  @apply font-mono bg-base-300/40 px-1 py-0.5 rounded text-xs;
}

.markdown-preview pre code {
  @apply bg-transparent p-0 rounded-none;
}

.markdown-preview a {
  @apply text-primary no-underline transition-all duration-200 hover:underline hover:text-secondary;
}

.markdown-preview img {
  @apply max-w-full rounded-md my-3 shadow-sm;
}

.markdown-preview table {
  @apply border-collapse w-full mb-3 text-xs;
}

.markdown-preview th, .markdown-preview td {
  @apply border border-base-300/70 p-1.5;
}

.markdown-preview th {
  @apply bg-base-300/40 font-semibold;
}

.markdown-preview tr:nth-child(even) {
  @apply bg-base-300/20;
}

/* Claude风格的聊天消息 */
.claude-message {
  background-color: var(--claude-message-bg, #F5F5F0);
  border-radius: 0.625rem;
  padding: 1rem;
  margin-bottom: 1rem;
  max-width: 90%;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  border-left: 3px solid var(--secondary-color, #6D4C41);
}

.user-message {
  background-color: var(--user-message-bg, #F0F9F6);
  border-radius: 0.625rem;
  padding: 1rem;
  margin-bottom: 1rem;
  max-width: 90%;
  margin-left: auto;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  border-right: 3px solid var(--primary-color, #10B981);
}

/* Claude风格的页面背景 */
.claude-bg {
  background-color: var(--background-light);
  min-height: 100vh;
  transition: background-color 0.3s ease;
}

.dark .claude-bg {
  background-color: var(--background-dark);
}

/* 自然风格的按钮 */
.nature-btn {
  background-color: var(--primary-color);
  color: white;
  border-radius: 0.375rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  border: none;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.nature-btn:hover {
  background-color: #059669;
  transform: translateY(-1px);
}`,
            },
          },
        },
      },
    },
  },
};
