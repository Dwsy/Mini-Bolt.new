我将为您设计一个使用 Vue.js 的现代化 Mini-Bolt.new 应用，基于您的需求进行工程化改造，提供更高级的配置面板，并保持极客风格。

```generateInfo id=generateInfo1
{
"projectName":"Mini-Bolt.new"
}
```

````{fileName:"README.md",filePath:"README.md"}
# Mini-Bolt.new

![Mini-Bolt.new](./src/assets/logo.png)

## 项目介绍

Mini-Bolt.new 是一个智能提示词引擎和项目文件解析工具，让Claude为您打造完美项目，一键导出即可运行！

### 核心功能

- ✨ **智能提示词生成**：根据项目需求和技术栈生成优化的提示词
- 📁 **代码解析与导出**：自动解析AI返回的代码并构建完整项目结构
- 💾 **模板管理系统**：保存和复用常用提示词模板
- 📚 **历史记录追踪**：保存生成的提示词和解析的项目
- 🔍 **Markdown预览**：内置Markdown渲染功能
- 🎨 **深色/浅色主题**：支持多种主题模式

## 技术栈

- Vue.js 3 (组合式API)
- Pinia 状态管理
- Vue Router
- TailwindCSS (工具类优先的CSS框架)
- daisyUI (Tailwind CSS组件库)
- marked.js (Markdown解析)
- JSZip (文件打包与下载)

## 安装与使用

### 环境要求

- Node.js 16+
- npm 7+ 或 yarn 1.22+

### 安装依赖

```bash
# 使用npm
npm install

# 或使用yarn
yarn install
````

### 开发模式

```bash
# 使用npm
npm run serve

# 或使用yarn
yarn serve
```

### 构建生产版本

```bash
# 使用npm
npm run build

# 或使用yarn
yarn build
```

## 项目结构

```
Mini-Bolt.new/
├── public/               # 静态资源
├── src/
│   ├── assets/           # 静态资源文件
│   ├── components/       # 可复用组件
│   │   ├── common/       # 通用组件
│   │   ├── layout/       # 布局组件
│   │   ├── modals/       # 模态框组件
│   │   ├── panels/       # 面板组件
│   │   └── ui/           # UI组件
│   ├── composables/      # 组合式函数
│   ├── constants/        # 常量定义
│   ├── router/           # 路由配置
│   ├── stores/           # Pinia状态管理
│   ├── utils/            # 工具函数
│   ├── views/            # 页面视图
│   ├── App.vue           # 根组件
│   └── main.js           # 入口文件
├── .gitignore            # Git忽略配置
├── index.html            # HTML模板
├── package.json          # 项目依赖
├── tailwind.config.js    # Tailwind配置
└── vite.config.js        # Vite配置
```

## 功能使用说明

1. **项目需求输入**：在左侧面板填写项目名称、技术栈和需求描述
2. **生成提示词**：点击生成按钮获取优化的 AI 提示词
3. **解析 AI 回复**：将 AI 返回的代码粘贴到解析面板进行处理
4. **查看项目结构**：在文件结构面板浏览解析出的项目文件
5. **下载项目**：点击下载按钮将完整项目打包为 ZIP 文件

## 开发者说明

### 扩展技术栈

修改 `src/constants/techStack.js` 文件添加新的技术栈选项。

### 自定义模板

通过模板管理界面添加和编辑提示词模板，支持变量替换功能。

### 主题定制

项目使用 TailwindCSS 进行样式管理，可在`tailwind.config.js`中自定义主题颜色。

## 许可证

MIT

````

```{fileName:"index.html",filePath:"index.html"}
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Mini-Bolt | Claude代码生成助手</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700&display=swap" rel="stylesheet">
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
````

```{fileName:"package.json",filePath:"package.json"}
{
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
    "vue-router": "^4.2.5"
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
  }
}
```

```{fileName:"vite.config.js",filePath:"vite.config.js"}
import { fileURLToPath, URL } from 'node:url'
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
  }
})
```

```{fileName:"tailwind.config.js",filePath:"tailwind.config.js"}
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6366f1',
          focus: '#4f46e5',
          content: '#ffffff',
        },
        secondary: {
          DEFAULT: '#8b5cf6',
          focus: '#7c3aed',
          content: '#ffffff',
        },
        accent: {
          DEFAULT: '#ec4899',
          focus: '#db2777',
          content: '#ffffff',
        },
        neutral: {
          DEFAULT: '#1f2937',
          focus: '#111827',
          content: '#f9fafb',
        },
      },
      fontFamily: {
        sans: ['Noto Sans SC', 'sans-serif'],
      },
      backgroundColor: {
        'gray-750': '#2d3748',
      },
      boxShadow: {
        'glass-light': '0 4px 24px 0 rgba(0, 0, 0, 0.1)',
        'glass-dark': '0 4px 24px 0 rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#6366f1",
          secondary: "#8b5cf6",
          accent: "#ec4899",
          neutral: "#f3f4f6",
          "base-100": "#ffffff",
        },
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          primary: "#6366f1",
          secondary: "#8b5cf6",
          accent: "#ec4899",
          neutral: "#111827",
          "base-100": "#1f2937",
        },
      },
    ],
  },
}
```

```{fileName:"postcss.config.js",filePath:"postcss.config.js"}
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

```{fileName:".gitignore",filePath:".gitignore"}
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
.DS_Store
dist
dist-ssr
coverage
*.local

/cypress/videos/
/cypress/screenshots/

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
```

```{fileName:"src/main.js",filePath:"src/main.js"}
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
```

```{fileName:"src/assets/main.css",filePath:"src/assets/main.css"}
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  /* 深色主题颜色 */
  --primary-color: #6366f1;
  --secondary-color: #8b5cf6;
  --accent-color: #ec4899;
  --background-dark: #111827;
  --card-dark: #1f2937;
  --text-light: #f9fafb;
  --text-gray: #9ca3af;

  /* 浅色主题颜色 */
  --background-light: #f3f4f6;
  --card-light: #ffffff;
  --text-dark: #111827;
  --text-gray-dark: #4b5563;
}

html, body {
  @apply min-h-screen font-sans;
}

body {
  @apply bg-neutral text-neutral-content transition-colors duration-200;
}

.glass-effect {
  @apply dark:bg-base-100/70 bg-white/70 backdrop-blur-md border border-white/10 dark:border-black/10 shadow-glass-light dark:shadow-glass-dark;
}

.gradient-border {
  @apply relative rounded-lg overflow-hidden;
}

.gradient-border::before {
  content: '';
  @apply absolute inset-0 p-px rounded-lg pointer-events-none;
  background: linear-gradient(to right, var(--primary-color), var(--secondary-color), var(--accent-color));
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
}

.custom-scrollbar::-webkit-scrollbar {
  @apply w-2 h-2;
}

.custom-scrollbar::-webkit-scrollbar-track {
  @apply dark:bg-base-300/50 bg-base-200/50 rounded-sm;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  @apply bg-primary/50 rounded-sm;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  @apply bg-primary/80;
}

.glow-effect {
  @apply shadow-[0_0_15px_rgba(99,102,241,0.5)];
}

.fade-enter-active, .fade-leave-active {
  @apply transition-opacity duration-300;
}
.fade-enter-from, .fade-leave-to {
  @apply opacity-0;
}

/* Markdown 样式 */
.markdown-preview {
  @apply text-base-content leading-relaxed;
}

.markdown-preview h1 {
  @apply text-2xl font-bold mt-6 mb-4 pb-1 border-b border-base-300 text-primary;
}

.markdown-preview h2 {
  @apply text-xl font-semibold mt-5 mb-3 text-primary;
}

.markdown-preview h3 {
  @apply text-lg font-semibold mt-4 mb-2;
}

.markdown-preview h4 {
  @apply text-base font-semibold mt-3 mb-2;
}

.markdown-preview p {
  @apply mb-4;
}

.markdown-preview ul, .markdown-preview ol {
  @apply mb-4 pl-6;
}

.markdown-preview li {
  @apply mb-1;
}

.markdown-preview blockquote {
  @apply border-l-4 border-primary pl-4 my-4 py-2 bg-primary/5 rounded-r italic;
}

.markdown-preview pre {
  @apply bg-base-300/80 p-4 rounded mb-4 overflow-x-auto;
}

.markdown-preview code {
  @apply font-mono bg-base-300/50 px-1.5 py-0.5 rounded text-sm;
}

.markdown-preview pre code {
  @apply bg-transparent p-0 rounded-none text-base;
}

.markdown-preview a {
  @apply text-primary no-underline transition-all duration-200 hover:underline hover:text-secondary;
}

.markdown-preview img {
  @apply max-w-full rounded my-4;
}

.markdown-preview table {
  @apply border-collapse w-full mb-4;
}

.markdown-preview th, .markdown-preview td {
  @apply border border-base-300 p-2;
}

.markdown-preview th {
  @apply bg-base-300/50 font-semibold;
}

.markdown-preview tr:nth-child(even) {
  @apply bg-base-300/30;
}
```

```{fileName:"src/assets/logo.svg",filePath:"src/assets/logo.svg"}
<svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="200" rx="20" fill="#111827"/>
  <path d="M67.5 40L50 70H85L67.5 40Z" fill="#6366F1"/>
  <path d="M110 40L92.5 70H127.5L110 40Z" fill="#8B5CF6"/>
  <path d="M152.5 40L135 70H170L152.5 40Z" fill="#EC4899"/>
  <rect x="50" y="80" width="120" height="35" rx="5" fill="#6366F1"/>
  <rect x="50" y="125" width="120" height="35" rx="5" fill="#8B5CF6"/>
  <path d="M40 82.5C40 78.9101 42.9101 76 46.5 76C50.0899 76 53 78.9101 53 82.5V157.5C53 161.09 50.0899 164 46.5 164C42.9101 164 40 161.09 40 157.5V82.5Z" fill="#EC4899"/>
  <path d="M167 82.5C167 78.9101 169.91 76 173.5 76C177.09 76 180 78.9101 180 82.5V157.5C180 161.09 177.09 164 173.5 164C169.91 164 167 161.09 167 157.5V82.5Z" fill="#EC4899"/>
</svg>
```

```{fileName:"src/assets/logo.png",filePath:"src/assets/logo.png"}
iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAAAXNSR0IArs4c6QAADjtJREFUeF7tnXuMXFUdx79nZrfdbbcvKCDQUh4BA4IVCRA0QSAhRSAhGAMSIgLGGBMIGv+AiCYQNfEVFSOaSIwUEiMQEY0aQSECIVYgQEGkCMjDFgptd7vv2Z25x9zZme3uzJ177+y9c849v/NP0t7fOef3+n7m3Ll3ZguEEQIgMCuBAghBAAKzE6AgvDsg0AcBCsKbAwIUhPcABOwI8BTJjhu9EkGAgiSi0CzTjgAFseNGr0QQoCCJKDTLtCNAQey40SsRBChIIgrNMu0IUBA7bvRKBAEKkohCs0w7AhTEjhu9EkGAgiSi0CzTjgAFseNGr0QQoCCJKDTLtCNAQey40SsRBChIIgrNMu0IUBA7bvRKBAEKkohCs0w7AhTEjhu9EkGAgiSi0CzTjgAFseNGr0QQoCCJKDTLtCNAQey40SsRBChIIgrNMu0IUBA7bvRKBAEKkohCs0w7AhTEjhu9EkGAgiSi0CzTjgAFseNGr0QQoCCJKDTLtCNAQey40SsRBChIIgrtvsyvXNrTXdvV+4FcMbaifLxSXzIspZVl666s3f9o7x2PD7uO6NKfgrhQ8zTms0/Z2rtoRbU2UJGNvYMDtYGV1dpAubwyJVlLHbXBVW9ObHn9icWe1uM0LAVxwrXYTuefctJodWDlYHWg0hvYt7LWWlm7f3UguKR9vZOy59VXnvwL7wtXS+K9c3oKYnB4aALM27BjoLJyz2BvRY4qg4O1/tXVgf7B/d+0nTEkqY2+9daNL0rq12SoIP0InrVhx8CGjTtm3kHm/7FtoM2T+47aweZe1YGJnmrvouxv+pO05ajVBlZKefDwAw8dml3DQ5F37rzlxmFN8y13oyBzVW5o/YbJu8aqDft6V29oXbz5OqVr3rffnHxaqzK4ZLInXZF72xI5qdoTSUqDUmpL5N/20nPPPFqeKz8tnweDmdrIbN13vrFtUtuZ4yMFmQXbGWfvXDs4tK+3t3dwr+2SvYdXBw4bnlxRGTp8yXSpNEGOnJ5h6shTrEBl5/jY69fOFYTWz/ddEM1xFCRQhRX7GX95pXfc6OCR47XBVYNHSXXJ0Kjc/RP42TtQaWcNzVOQQIQ1+23cc+e2NSNrDxutjR6+ZHTkyNGx0aNG9w0fNToycvhYeXi08drYyOGxtVvvvP2Q2TNoOB4E9An4e6VXJ+ZVZ/69bcfK8eFVI+PDK0dHD1sxumR47YgcR9aMja5ZW1m6pipr1qytLF9TrSxdPbr01NG1W++8/ZSiJ7n66aeXPve/A+tfPrCuuq6ytrqi97DV1RUrl1Z7Rg6t9S4/pFpZerRcax6PW+Xl5aMPLF1aPqq8ZOCYUk9P+egD+wfWHjj40OoDq8YO7F+56sCBFcsOrCwfWD5w4Pll46N7+noPVno7L6GlIMJ3yK6f/2LF3vFdxz7/+qvHjb/y8voD+/etH9+97cTdL7y47vVHftPSEnVhKyXxnMI2HQXpAPTD22/Y+vQffnfV6PAR1VpvT6Vau1ieJXW+//JKr+wn5Tjx2t13XFKUZbU9I32lJEUpZqA8KEiLQm362g/k4rx5LKksHT5+dOTojWPDa44fHTlq/djw0Rsry1Zv7KksP2r/yJoTXvr1nV8tyk0kKUpRihmoDMkXZNNXv1eVR7EjI8PrNo6v2HD82Jr1J4yNHXNCZdhcDuFeSUoiqVzMIGmQXEE2fe0H1bExudbmWXn8a8Px42s3PD868saj8ljX6sja9WNLVh1bHUvvUbpIklKQ/hXJ5NM5gUzMhd/6UXX/nl0njg2Pbxw94sgTJkbWbBwbX7Xx2X/eOW2OkQTJGu8KyRDkwmu/W923Z9dJy1YftXFs7MgTxsdO2HjM567cWCTJ5FlZ+xtKUmrdIRmC/P23jx9+3Ge+eMqSFcecVF269KQlK444Sa6VeR7Xf/2i/T+1LGZLKYmWSvbNU5BdI3tOW7py3WlLx1edVllSEUkmn7SVPMnULFf3LSgllFSunq9AcVEQ6wIVXZL2NSxfkkxJQkmsS9y3IwXpizD3BWtJSzZLEkoyd+GNrkBBjNCFGbSVQPva5iBJWkpCScLUs2UWCqJUl7SUhJLolJmCKNWlpVRZ0qGkakrSumaSkkzVqO0ICtKGQ/tLSkJJspIqCpIFveFn+ZJQEh1JKYhOXaZ7t5KTklCSvO8IrUdQkCw0Az/LSipKQkmyFNrgGQpiwCv00LaS9r2WolTtt1ZSkrxVaP+cggQoT0tJKUmYUlIQpbo0pWopN0uppp4eUZLMhaYgmZGGfZCStKSjJGHrSUEoSdgbdJbZKEieahf0rL3QrR/NStx+PTLfcJ+S6EhKQXTqMt37oLRqSpKUVFGQrAUOfJ+YLVVrEkqiI6miIDolaOnalpKSqCgpBVGpS0vXVtL2dZcvmYxJKUm+QlOQfPxsn6YkU0kpie3NknqvZAsiH/Eo1w+WB1YuqfQcUC6OMj5KorAkKxdkw/qxgcHewXJ1YmDJgbL8a1uO8vZnKk+TTOU4SJKnpCUEfpaHl8uly0rlnvO3/f6WbcrLciJI+2JRkpKsfdN5tw/vHNnR/g4ln5coSEsPSqK0JL4kra+LnTyDlG6pjZ2wrE/JFfZ4QUoXlw9cdMmWLf8KvRjt+ShJe9W8SdL6OssZZOadZbmmKa3Lx5MmVpffddLGjX/XXnCe/pSkna7TklCQ9h5KV5TfPWnjcXwKJy/OJEmS9/1ycJD+9yDf3t3UaH0xpZRb5BdTKrJOTxfvmtKmpoY25UYiK5WY5wgyGwxKkqcFs0oiZ455cQZ57wLdkyYfk0+WF+qxiQZQEpnFyZeyIJIc3HrL9OGl0mWlH//stqe8ZBRwEkoiEznFojhIEqGvnFVJ/OvlJe0xTyXxLsnBklCSySUWCJK04jvtwlMS56o4D0hJnNGFDSyPPZVfXXOZLs4ZpB9VnknyUGxKkly0o5i+JCkkj395c/reMpWDglCSAkHyL8nBrbd8X5a5qfTj7d41yXPGYJ+FkiRfkjxnknx0nRNTkiAFKfhM0k8SngX6UgwyJiVJviTteScvyQdXNn/X5B35LFZfSSjJe2gOlsT3o70mQcv5XtT2vGMriV+Sy8qlS2XHrW/+Ln1JKEnfkminTlZJ5O3YvnfybklhZ5C+kgQ4SUpJkq+qT0l8QdplUHq7tS+onEF8EEXeblGS5FenH10/8xaIkljWg5JY1iN0Nx9VoJxpLB7F4Wnh2BCgILbk6JcIAhQkEYVmmXYEKIgdN3olggAFSUShWaYdAQpix41eiSBAQRJRaJZpR4CC2HGjVyIIUJBEFJpl2hGgIHbc6JUIAhQkEYVmmXYEKIgdN3olggAFSUShWaYdAQpix41eiSBAQRJRaJZpR4CC2HGjVyIIUJBEFJpl2hGgIHbc6JUIAhQkEYVmmXYEKIgdN3olggAFSUShWaYdAQpix41eiSBAQRJRaJZpR4CC2HGjVyIIUJBEFJpl2hGgIHbc6JUIAhQkEYVmmXYEKIgdN3olggAFSUShWaYdAQpix41eiSBAQRJRaJZpR4CC2HGjVyIIUJBEFJpl2hGgIHbc6JUIAhQkEYVmmXYEKIgdN3olggAFSUShWaYdAQpix41eiSBAQRJRaJZpR4CC2HGjVyIIUJBEFJpl2hGgIHbc6JUIAhQkEYVmmXYEKIgdN3olggAFSUShWaYdAQpix41eiSBAQRJRaJZpR4CC2HGjVyIIUJBEFJpl2hGgIHbc6JUIAhQkEYVmmXYEKIgdN3olggAFSUShWaYdAQpix41eiSBAQRJRaJZpR4CC2HGjVyIIUJBEFJpl2hGgIHbc6JUIAhQkEYVmmXYEKIgdN3olggAFSUShWaYdAQpix41eiSBAQRJRaJZpR4CC2HGjVyIIUJBEFJpl2hGgIHbc6JUIAhQkEYVmmXYEKIgdN3olggAFSUShWaYdAQpix41eiSBAQRJRaJZpR4CC2HGjVyIIUJBEFJpl2hGgIHbc6JUIAhQkEYVmmXYEKIgdN3olggAFSUShWaYdAQpix41eiSBAQRJRaJZpR4CC2HGjVyIIUJBEFJpl2hGgIHbc6JUIAhQkEYVmmXYEKIgdN3olggAFSUShWaYdAQpix41eiSBAQRJRaJZpR4CC2HGjVyIIUJBEFJpl2hGgIHbc6JUIAhQkEYVmmXYEKIgdN3olggAFSUShWaYdAQpix41eiSBAQRJRaJZpR4CC2HGjVyIIUJBEFJpl2hGgIHbc6JUIAhQkEYVmmXYEKIgdN3olggAFSUShWaYdAQpix41eiSBAQRJRaJZpR4CC2HGjVyIIUJBEFJpl2hGgIHbc6JUIAhQkEYVmmXYEKIgdN3olggAFSUShWaYdAQpix41eiSBAQRJRaJZpR4CC2HGjVyIIUJBEFJpl2hGgIHbc6JUIAhQkEYVmmXYEKIgdN3olggAFSUShWaYdAQpix41eiSBAQRJRaJZpR4CC2HGjVyIIUJBEFJpl2hGgIHbc6JUIAhQkEYVmmXYEKIgdN3olggAFSUShWaYdAQpix41eiSBAQRJRaJZpR4CC2HGjVyIIUJBEFJpl2hGgIHbc6JUIAhQkEYVmmXYEKIgdN3olggAFSUShWaYdAQpix41eiSBAQRJRaJZpR4CC2HGjVyIIUJBEFJpl2hGgIHbc6JUIAhQkEYVmmXYEKIgdN3olggAFSUShWaYdAQpix41eiSBAQRJRaJZpR4CC2HGjVyIIUJBEFJpl2hGgIHbc6JUIAv8HWRLz8pvsG5EAAAAASUVORK5CYII=
```

```{fileName:"src/App.vue",filePath:"src/App.vue"}
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
```

```{fileName:"src/router/index.js",filePath:"src/router/index.js"}
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    }
  ]
})

export default router
```

```{fileName:"src/views/HomeView.vue",filePath:"src/views/HomeView.vue"}
<script setup>
import { ref } from 'vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import ConfigPanel from '@/components/panels/ConfigPanel.vue'
import MainPanel from '@/components/panels/MainPanel.vue'

// Modals
import TemplateManagerModal from '@/components/modals/TemplateManagerModal.vue'
import HistoryModal from '@/components/modals/HistoryModal.vue'
import ParseHistoryModal from '@/components/modals/ParseHistoryModal.vue'
import MarkdownPreviewModal from '@/components/modals/MarkdownPreviewModal.vue'

// Modal visibility states
const showTemplateManager = ref(false)
const showHistoryModal = ref(false)
const showParseHistoryModal = ref(false)
const showMarkdownPreview = ref(false)

// Methods to toggle modal visibility
const toggleTemplateManager = () => {
  showTemplateManager.value = !showTemplateManager.value
}

const toggleHistoryModal = () => {
  showHistoryModal.value = !showHistoryModal.value
}

const toggleParseHistoryModal = () => {
  showParseHistoryModal.value = !showParseHistoryModal.value
}

const toggleMarkdownPreview = (content = '') => {
  showMarkdownPreview.value = !showMarkdownPreview.value
  return content // Used by MarkdownPreviewModal to get content
}
</script>

<template>
  <div class="min-h-screen bg-base-200 dark:bg-neutral transition-colors duration-200">
    <div class="container mx-auto px-4 py-8 max-w-7xl">
      <!-- Header -->
      <AppHeader
        @show-template-manager="toggleTemplateManager"
        @show-history-modal="toggleHistoryModal"
        @show-parse-history-modal="toggleParseHistoryModal"
      />

      <!-- Main Content -->
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <!-- Left Panel - Configuration -->
        <div class="lg:col-span-2">
          <ConfigPanel />
        </div>

        <!-- Right Panel - Main Content -->
        <div class="lg:col-span-3">
          <MainPanel
            @preview-markdown="toggleMarkdownPreview"
          />
        </div>
      </div>
    </div>

    <!-- Modals -->
    <TemplateManagerModal
      v-if="showTemplateManager"
      @close="toggleTemplateManager"
    />

    <HistoryModal
      v-if="showHistoryModal"
      @close="toggleHistoryModal"
    />

    <ParseHistoryModal
      v-if="showParseHistoryModal"
      @close="toggleParseHistoryModal"
    />

    <MarkdownPreviewModal
      v-if="showMarkdownPreview"
      @close="toggleMarkdownPreview"
    />
  </div>
</template>
```

```{fileName:"src/components/layout/AppHeader.vue",filePath:"src/components/layout/AppHeader.vue"}
<script setup>
import { useThemeStore } from '@/stores/theme'
import ThemeSwitch from '@/components/common/ThemeSwitch.vue'

const themeStore = useThemeStore()

const emit = defineEmits(['show-template-manager', 'show-history-modal', 'show-parse-history-modal'])
</script>

<template>
  <header class="mb-8 text-center">
    <div class="flex justify-end mb-2">
      <ThemeSwitch />
    </div>

    <h1 class="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 inline-block">
      Mini-Bolt.new
    </h1>

    <p class="text-base-content/60 mt-2 max-w-3xl mx-auto">
      ✨ 智能提示词引擎 + 解析为项目文件 = 让Claude为你打造完美项目，一键导出即可运行！
    </p>

    <!-- 添加模板和历史管理按钮 -->
    <div class="mt-4 flex justify-center space-x-4">
      <button
        @click="emit('show-template-manager')"
        class="btn btn-sm btn-primary"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
        模板管理
      </button>

      <button
        @click="emit('show-history-modal')"
        class="btn btn-sm btn-secondary"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        提示词历史
      </button>

      <button
        @click="emit('show-parse-history-modal')"
        class="btn btn-sm btn-accent"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        解析历史
      </button>
    </div>
  </header>
</template>
```

```{fileName:"src/components/common/ThemeSwitch.vue",filePath:"src/components/common/ThemeSwitch.vue"}
<script setup>
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()

const toggleTheme = () => {
  themeStore.toggleTheme()
}
</script>

<template>
  <button
    @click="toggleTheme"
    class="btn btn-circle btn-sm btn-ghost"
    :title="themeStore.isDarkTheme ? '切换到浅色模式' : '切换到深色模式'"
  >
    <!-- 月亮图标 (深色模式) -->
    <svg
      v-if="themeStore.isDarkTheme"
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5 text-yellow-300"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
    </svg>

    <!-- 太阳图标 (浅色模式) -->
    <svg
      v-else
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5 text-yellow-500"
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
</template>
```

```{fileName:"src/components/common/NotificationComponent.vue",filePath:"src/components/common/NotificationComponent.vue"}
<script setup>
import { useNotificationStore } from '@/stores/notification'

const notificationStore = useNotificationStore()
</script>

<template>
  <div class="fixed bottom-4 right-4 max-w-sm z-50">
    <Transition name="fade">
      <div
        v-if="notificationStore.notification.show"
        class="glass-effect rounded-lg p-4 text-base-content flex items-start glow-effect"
        :class="{
          'bg-success/20 text-success': notificationStore.notification.type === 'success',
          'bg-error/20 text-error': notificationStore.notification.type === 'error',
          'bg-info/20 text-info': notificationStore.notification.type === 'info'
        }"
      >
        <div class="mr-3 mt-0.5">
          <svg
            v-if="notificationStore.notification.type === 'success'"
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

          <svg
            v-else-if="notificationStore.notification.type === 'error'"
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clip-rule="evenodd"
            />
          </svg>

          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2h.01a1 1 0 100-2H9z"
              clip-rule="evenodd"
            />
          </svg>
        </div>

        <div>
          <p class="font-medium text-sm">{{ notificationStore.notification.title }}</p>
          <p class="text-sm">{{ notificationStore.notification.message }}</p>
        </div>
      </div>
    </Transition>
  </div>
</template>
```

```{fileName:"src/components/common/GlassCard.vue",filePath:"src/components/common/GlassCard.vue"}
<script setup>
defineProps({
  title: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div class="glass-effect gradient-border rounded-lg p-4">
    <h2 v-if="title || icon" class="text-xl font-semibold text-primary mb-4 flex items-center">
      <span v-if="icon" v-html="icon" class="mr-2"></span>
      {{ title }}
    </h2>
    <slot></slot>
  </div>
</template>
```

```{fileName:"src/components/panels/ConfigPanel.vue",filePath:"src/components/panels/ConfigPanel.vue"}
<script setup>
import { ref, computed } from 'vue'
import { usePromptStore } from '@/stores/prompt'
import { useTechStackStore } from '@/stores/techStack'
import { useNotificationStore } from '@/stores/notification'
import GlassCard from '@/components/common/GlassCard.vue'

const promptStore = usePromptStore()
const techStackStore = useTechStackStore()
const notificationStore = useNotificationStore()

// Local reactive state
const projectName = ref('')
const requirements = ref('')
const customTech = ref('')
const projectTheme = ref('dark')
const selectedTechs = ref([])

// Initialize with some default values
selectedTechs.value = ['Vue.js', 'TypeScript', 'TailwindCSS', 'daisyui']

// Methods
const toggleCategory = (index) => {
  techStackStore.toggleCategory(index)
}

const toggleTech = (tech) => {
  const index = selectedTechs.value.indexOf(tech)
  if (index === -1) {
    selectedTechs.value.push(tech)
  } else {
    selectedTechs.value.splice(index, 1)
  }
}

const generatePrompt = () => {
  if (!projectName.value.trim()) {
    notificationStore.show('error', '请填写项目名称', '项目名称不能为空')
    return
  }

  if (!requirements.value.trim()) {
    notificationStore.show('error', '请填写项目需求', '项目需求描述不能为空')
    return
  }

  // Get all selected technologies
  const allTechs = [...selectedTechs.value]
  if (customTech.value.trim()) {
    const customTechs = customTech.value.split(',').map(t => t.trim()).filter(t => t)
    allTechs.push(...customTechs)
  }

  // Generate the prompt
  promptStore.generatePrompt({
    projectName: projectName.value,
    selectedTechs: allTechs,
    projectTheme: projectTheme.value,
    requirements: requirements.value
  })

  notificationStore.show('success', '提示词已生成', '您可以复制提示词并发送给AI助手')
}

// Computed properties
const themeDescription = computed(() => {
  if (projectTheme.value === 'dark') {
    return '暗色主题模式，使界面有高级感'
  } else if (projectTheme.value === 'light') {
    return '亮色主题模式，使界面清爽自然'
  } else if (projectTheme.value === 'both') {
    return '同时支持暗色和亮色主题模式，并提供切换功能'
  }
  return ''
})

const icon = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
  <path fill-rule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clip-rule="evenodd"></path>
</svg>`
</script>

<template>
  <GlassCard :title="'项目需求输入'" :icon="icon">
    <div class="space-y-4">
      <div>
        <label for="projectName" class="block text-sm font-medium text-base-content/70 mb-1">项目名称</label>
        <input
          id="projectName"
          v-model="projectName"
          type="text"
          class="input input-bordered w-full bg-base-200 dark:bg-base-300"
          placeholder="输入项目名称"
        >
      </div>

      <div>
        <label for="techStack" class="block text-sm font-medium text-base-content/70 mb-1">技术栈</label>
        <div class="space-y-3 mb-3">
          <div
            v-for="(category, index) in techStackStore.techCategories"
            :key="index"
            class="border border-base-300 rounded-md overflow-hidden"
          >
            <div
              @click="toggleCategory(index)"
              class="bg-base-300 dark:bg-base-300 px-3 py-1.5 text-primary font-medium text-xs flex items-center cursor-pointer hover:bg-base-300/80"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-3.5 w-3.5 mr-1 opacity-70 transition-transform"
                :class="{'rotate-180': !category.open}"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
              <span>{{ category.name }}</span>
              <span class="ml-1.5 text-base-content/50 text-xs">({{ category.techs.length }})</span>
              <span
                v-if="category.techs.some(tech => selectedTechs.includes(tech))"
                class="ml-auto flex items-center text-success"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-3 w-3 mr-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>{{ category.techs.filter(tech => selectedTechs.includes(tech)).length }}</span>
              </span>
            </div>
            <div
              v-show="category.open"
              class="p-2 bg-base-100 dark:bg-base-200 bg-opacity-50 transition-all duration-200 ease-in-out"
            >
              <div class="flex flex-wrap gap-1.5">
                <button
                  v-for="tech in category.techs"
                  :key="tech"
                  @click="toggleTech(tech)"
                  :class="[
                    'px-2 py-1 rounded-md text-xs transition-all flex items-center',
                    selectedTechs.includes(tech)
                      ? 'bg-primary text-primary-content'
                      : 'bg-base-300 dark:bg-base-300 text-base-content/60 hover:bg-base-300/80'
                  ]"
                >
                  <img
                    :src="techStackStore.getTechIconUrl(tech)"
                    class="w-3.5 h-3.5 mr-1.5"
                    :alt="tech"
                  >
                  {{ tech }}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="relative">
          <input
            id="techStack"
            v-model="customTech"
            type="text"
            class="input input-bordered w-full bg-base-200 dark:bg-base-300 pl-8"
            placeholder="其他技术栈 (用逗号分隔)"
          >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 text-base-content/40 absolute left-2.5 top-1/2 transform -translate-y-1/2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
        </div>
      </div>

      <div>
        <label for="projectTheme" class="block text-sm font-medium text-base-content/70 mb-1">主题模式</label>
        <div class="flex flex-wrap gap-2 mb-2">
          <button
            @click="projectTheme = 'dark'"
            :class="[
              'px-2 py-1 rounded-md text-xs transition-all flex items-center',
              projectTheme === 'dark'
                ? 'bg-primary text-primary-content'
                : 'bg-base-300 text-base-content/60 hover:bg-base-300/80'
            ]"
          >
            <span class="w-3 h-3 rounded-full bg-neutral mr-1 border border-base-300"></span>
            暗色
          </button>
          <button
            @click="projectTheme = 'light'"
            :class="[
              'px-2 py-1 rounded-md text-xs transition-all flex items-center',
              projectTheme === 'light'
                ? 'bg-primary text-primary-content'
                : 'bg-base-300 text-base-content/60 hover:bg-base-300/80'
            ]"
          >
            <span class="w-3 h-3 rounded-full bg-white mr-1 border border-gray-300"></span>
            亮色
          </button>
          <button
            @click="projectTheme = 'both'"
            :class="[
              'px-2 py-1 rounded-md text-xs transition-all flex items-center',
              projectTheme === 'both'
                ? 'bg-primary text-primary-content'
                : 'bg-base-300 text-base-content/60 hover:bg-base-300/80'
            ]"
          >
            <span class="w-3 h-3 rounded-full bg-gradient-to-r from-neutral to-white mr-1 border border-base-300"></span>
            二者
          </button>
        </div>

        <div class="mt-2 p-2 bg-base-300/50 rounded-md text-xs text-base-content/70 border border-base-300">
          <div class="flex items-center mb-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 mr-1 text-primary"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2h.01a1 1 0 100-2H9z"
                clip-rule="evenodd"
              />
            </svg>
            主题预览
          </div>
          <div class="flex gap-2">
            <div
              v-if="projectTheme === 'dark' || projectTheme === 'both'"
              class="flex-1 bg-neutral p-2 rounded-md border border-base-300"
            >
              <div class="h-2 w-1/2 bg-primary rounded-sm mb-1"></div>
              <div class="h-1 w-3/4 bg-base-300 rounded-sm"></div>
            </div>
            <div
              v-if="projectTheme === 'light' || projectTheme === 'both'"
              class="flex-1 bg-white p-2 rounded-md border border-gray-300"
            >
              <div class="h-2 w-1/2 bg-primary rounded-sm mb-1"></div>
              <div class="h-1 w-3/4 bg-gray-200 rounded-sm"></div>
            </div>
          </div>
          <div class="mt-1">
            <span class="text-primary">提示：</span> 选择"二者"可让您的项目同时支持暗色和亮色模式，并允许用户切换。
          </div>
        </div>
      </div>

      <div>
        <label for="requirements" class="block text-sm font-medium text-base-content/70 mb-1">项目需求描述</label>
        <textarea
          id="requirements"
          v-model="requirements"
          rows="6"
          class="textarea textarea-bordered w-full bg-base-200 dark:bg-base-300 custom-scrollbar"
          placeholder="详细描述您的项目需求、功能特性等..."
        ></textarea>
      </div>

      <button
        @click="generatePrompt"
        class="btn btn-primary w-full"
      >
        生成提示词
      </button>
    </div>
  </GlassCard>
</template>
```

```{fileName:"src/components/panels/MainPanel.vue",filePath:"src/components/panels/MainPanel.vue"}
<script setup>
import { ref, computed } from 'vue'
import { useFileStore } from '@/stores/files'
import GuidePanel from '@/components/panels/GuidePanel.vue'
import PromptPanel from '@/components/panels/PromptPanel.vue'
import ParsePanel from '@/components/panels/ParsePanel.vue'
import FilesPanel from '@/components/panels/FilesPanel.vue'
import FilePreviewPanel from '@/components/panels/FilePreviewPanel.vue'

const emit = defineEmits(['preview-markdown'])

const fileStore = useFileStore()

// Active tab state
const activeTab = ref('prompt')

// Tab definitions
const tabs = ref([
  {
    id: 'prompt',
    name: '提示词',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" /></svg>'
  },
  {
    id: 'parse',
    name: '解析结果',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>'
  },
  {
    id: 'files',
    name: '文件结构',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>'
  },
  {
    id: 'preview',
    name: '文件预览',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>'
  }
])

// Computed properties
const hasFiles = computed(() => fileStore.parsedFiles.length > 0)

// Methods
const handlePreviewMarkdown = (content) => {
  emit('preview-markdown', content)
}
</script>

<template>
  <div>
    <GuidePanel class="mb-6" />

    <div class="glass-effect gradient-border rounded-lg overflow-hidden">
      <div class="flex border-b border-base-300">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="[
            'py-3 px-4 font-medium text-sm border-b-2 transition-all',
            activeTab === tab.id
              ? 'text-primary border-primary'
              : 'border-transparent text-base-content/40 hover:text-base-content/70'
          ]"
        >
          <span class="flex items-center">
            <span v-html="tab.icon" class="mr-2"></span>
            {{ tab.name }}
          </span>
        </button>
      </div>

      <div class="p-4">
        <!-- 提示词输出 -->
        <PromptPanel v-if="activeTab === 'prompt'" />

        <!-- 解析结果 -->
        <ParsePanel
          v-if="activeTab === 'parse'"
          @parsed="activeTab = 'files'"
        />

        <!-- 文件结构 -->
        <FilesPanel
          v-if="activeTab === 'files'"
          @select-file="activeTab = 'preview'"
        />

        <!-- 文件预览 -->
        <FilePreviewPanel
          v-if="activeTab === 'preview'"
          @preview-markdown="handlePreviewMarkdown"
        />
      </div>
    </div>
  </div>
</template>
```

```{fileName:"src/components/panels/GuidePanel.vue",filePath:"src/components/panels/GuidePanel.vue"}
<script setup>
import GlassCard from '@/components/common/GlassCard.vue'

const icon = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path>
</svg>`
</script>

<template>
  <GlassCard :title="'使用指南'" :icon="icon">
    <div class="space-y-3 text-base-content/70 text-sm">
      <p>1. 在左侧面板中填写项目需求和技术栈</p>
      <p>2. 点击「生成提示词」按钮获取AI提示词</p>
      <p>3. 复制提示词并发送给AI助手</p>
      <p>4. 将AI返回的代码粘贴到「解析结果」面板</p>
      <p>5. 查看文件结构并可选择下载生成的项目文件</p>
    </div>
  </GlassCard>
</template>
```

```{fileName:"src/components/panels/PromptPanel.vue",filePath:"src/components/panels/PromptPanel.vue"}
<script setup>
import { usePromptStore } from '@/stores/prompt'
import { useNotificationStore } from '@/stores/notification'

const promptStore = usePromptStore()
const notificationStore = useNotificationStore()

// Methods
const generatePrompt = () => {
  promptStore.regeneratePrompt()
  notificationStore.show('success', '提示词已重新生成', '您可以复制提示词并发送给AI助手')
}

const copyPrompt = () => {
  if (!promptStore.generatedPrompt) return

  navigator.clipboard.writeText(promptStore.generatedPrompt)
    .then(() => {
      notificationStore.show('success', '复制成功', '提示词已复制到剪贴板')
    })
    .catch(err => {
      notificationStore.show('error', '复制失败', err.message || '请手动选择文本并复制')
    })
}
</script>

<template>
  <div class="space-y-4">
    <textarea
      v-model="promptStore.generatedPrompt"
      placeholder="在此编辑提示词..."
      rows="12"
      class="textarea textarea-bordered w-full bg-base-200 dark:bg-base-300 custom-scrollbar"
    ></textarea>

    <div class="flex justify-between">
      <button
        @click="generatePrompt"
        class="btn btn-primary"
      >
        生成提示词
      </button>

      <button
        @click="copyPrompt"
        class="btn btn-neutral"
        :disabled="!promptStore.generatedPrompt"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
        </svg>
        复制提示词
      </button>
    </div>
  </div>
</template>
```

```{fileName:"src/components/panels/ParsePanel.vue",filePath:"src/components/panels/ParsePanel.vue"}
<script setup>
import { ref } from 'vue'
import { useFileStore } from '@/stores/files'
import { useNotificationStore } from '@/stores/notification'

const emit = defineEmits(['parsed'])

const fileStore = useFileStore()
const notificationStore = useNotificationStore()

// Local state
const parseInput = ref('')
const parseError = ref('')

// Methods
const parseCode = async () => {
  if (!parseInput.value.trim()) {
    notificationStore.show('error', '请填写解析内容', '请粘贴AI生成的代码')
    return
  }

  try {
    parseError.value = ''

    const result = await fileStore.parseCode(parseInput.value)

    if (result.success) {
      notificationStore.show('success', '解析成功', `共解析出 ${fileStore.parsedFiles.length} 个文件`)
      emit('parsed')
    } else {
      parseError.value = result.error || '解析失败，请检查输入格式'
      notificationStore.show('error', '解析失败', parseError.value)
    }
  } catch (error) {
    parseError.value = `解析出错: ${error.message}`
    notificationStore.show('error', '解析失败', error.message)
  }
}
</script>

<template>
  <div class="space-y-4">
    <textarea
      v-model="parseInput"
      placeholder="将AI返回的回复粘贴到这里..."
      rows="16"
      class="textarea textarea-bordered w-full bg-base-200 dark:bg-base-300 custom-scrollbar"
    ></textarea>

    <button
      @click="parseCode"
      class="btn btn-primary w-full"
    >
      解析模型回复
    </button>

    <div
      v-if="parseError"
      class="bg-error/20 border border-error/30 rounded-md p-4 text-error text-sm"
    >
      {{ parseError }}
    </div>
  </div>
</template>
```

```{fileName:"src/components/panels/FilesPanel.vue",filePath:"src/components/panels/FilesPanel.vue"}
<script setup>
import { useFileStore } from '@/stores/files'
import { useNotificationStore } from '@/stores/notification'
import FileTree from '@/components/common/FileTree.vue'

const emit = defineEmits(['select-file'])

const fileStore = useFileStore()
const notificationStore = useNotificationStore()

// Methods
const downloadFiles = async () => {
  if (fileStore.parsedFiles.length === 0) return

  try {
    const result = await fileStore.downloadFiles()

    if (result.success) {
      notificationStore.show('success', '下载成功', `${result.fileName} 已开始下载`)
    } else {
      notificationStore.show('error', '下载失败', result.error || '无法下载文件')
    }
  } catch (error) {
    notificationStore.show('error', '下载失败', error.message)
  }
}

const selectFile = (filePath) => {
  fileStore.selectFile(filePath)
  emit('select-file')
}
</script>

<template>
  <div class="space-y-4">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-lg font-medium text-primary">
        项目文件结构
      </h3>
      <button
        v-if="fileStore.parsedFiles.length > 0"
        @click="downloadFiles"
        class="btn btn-primary btn-sm"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
        </svg>
        下载项目文件
      </button>
    </div>

    <div
      v-if="fileStore.parsedFiles.length > 0"
      class="bg-base-200 dark:bg-base-300 rounded-md p-4 max-h-[60vh] overflow-auto custom-scrollbar"
    >
      <FileTree
        :file-tree="fileStore.fileTree"
        @select-file="selectFile"
      />
    </div>

    <div
      v-else
      class="text-center py-20 text-base-content/40"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
      </svg>
      <p>请先解析AI返回的代码</p>
    </div>

    <div
      v-if="fileStore.parsedFiles.length > 0"
      class="text-xs text-base-content/50"
    >
      <div class="font-medium text-primary mb-1">解析内容预览</div>
      <pre class="bg-base-300 p-2 rounded-md max-h-32 overflow-y-auto custom-scrollbar text-base-content/70 whitespace-pre-wrap break-words">{{ fileStore.parseInput.substring(0, 200) }}{{ fileStore.parseInput.length > 200 ? '...' : '' }}</pre>
    </div>
  </div>
</template>
```

```{fileName:"src/components/panels/FilePreviewPanel.vue",filePath:"src/components/panels/FilePreviewPanel.vue"}
<script setup>
import { computed } from 'vue'
import { useFileStore } from '@/stores/files'
import { useNotificationStore } from '@/stores/notification'
import { useFileUtils } from '@/composables/useFileUtils'

const emit = defineEmits(['preview-markdown'])

const fileStore = useFileStore()
const notificationStore = useNotificationStore()
const { getFileIconUrl, getLanguage, isMarkdownFile } = useFileUtils()

// Computed properties
const selectedFile = computed(() => fileStore.selectedFile)

// Methods
const copyFileContent = () => {
  if (!selectedFile.value) return

  navigator.clipboard.writeText(selectedFile.value.content)
    .then(() => {
      notificationStore.show('success', '复制成功', '文件内容已复制到剪贴板')
    })
    .catch(err => {
      notificationStore.show('error', '复制失败', err.message || '请手动选择文本并复制')
    })
}

const openMarkdownPreview = () => {
  if (!selectedFile.value || !isMarkdownFile(selectedFile.value.fileName)) return
  emit('preview-markdown', selectedFile.value.content)
}
</script>

<template>
  <div class="space-y-4">
    <div v-if="selectedFile" class="space-y-4">
      <div class="flex justify-between items-center">
        <h3 class="text-lg font-medium text-primary truncate">
          {{ selectedFile.fileName }}
        </h3>
        <div class="flex items-center space-x-2">
          <span class="badge badge-outline text-xs px-2 py-1 flex items-center">
            <img
              v-if="getFileIconUrl(selectedFile.fileName)"
              :src="getFileIconUrl(selectedFile.fileName)"
              :alt="getLanguage(selectedFile.fileName)"
              class="h-3 w-3 mr-1.5"
            />
            {{ getLanguage(selectedFile.fileName) }}
          </span>

          <!-- Markdown预览按钮 -->
          <button
            v-if="isMarkdownFile(selectedFile.fileName)"
            @click="openMarkdownPreview"
            class="btn btn-sm btn-secondary"
            title="Markdown预览"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 9h1m4 0h1m-1 4h-1m-3 0H9" />
            </svg>
          </button>

          <button
            @click="copyFileContent"
            class="btn btn-sm btn-neutral"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
            </svg>
          </button>
        </div>
      </div>

      <pre class="bg-base-200 dark:bg-base-300 rounded-md p-4 text-base-content overflow-auto custom-scrollbar max-h-[60vh] text-sm">{{ selectedFile.content }}</pre>
    </div>

    <div
      v-else
      class="text-center py-20 text-base-content/40"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
      </svg>
      <p>请先解析AI返回的代码，然后选择一个文件预览</p>
    </div>
  </div>
</template>
```

```{fileName:"src/components/common/FileTree.vue",filePath:"src/components/common/FileTree.vue"}
<script setup>
import { useFileUtils } from '@/composables/useFileUtils'

const emit = defineEmits(['select-file'])

const props = defineProps({
  fileTree: {
    type: Array,
    required: true
  }
})

const { getFileIconUrl } = useFileUtils()

const selectFile = (filePath) => {
  emit('select-file', filePath)
}
</script>

<template>
  <div>
    <ul>
      <li class="font-medium text-primary">
        <div class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-1.5 text-primary" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 5h-8.586l-2-2H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2z"></path>
          </svg>
          <span>项目根目录</span>
        </div>
        <ul class="ml-4 mt-2">
          <li
            v-for="item in fileTree"
            :key="item.path"
            class="mb-1"
          >
            <div
              class="flex items-center cursor-pointer"
              @click="item.type === 'file' ? selectFile(item.filePath) : null"
            >
              <svg
                v-if="item.type === 'folder'"
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4 mr-1.5 text-primary"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20 5h-8.586l-2-2H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2z"></path>
              </svg>
              <img
                v-else-if="getFileIconUrl(item.name)"
                :src="getFileIconUrl(item.name)"
                :alt="item.name"
                class="w-4 h-4 mr-1.5"
              />
              <img
                v-else
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
                alt="文件"
                class="w-4 h-4 mr-1.5"
              />
              <span :class="{'text-primary hover:underline': item.type === 'file'}">
                {{ item.name }}
              </span>
            </div>

            <!-- 递归渲染子项目 -->
            <ul v-if="item.children && item.children.length" class="ml-5 mt-1">
              <li
                v-for="child in item.children"
                :key="child.path"
                class="mb-1"
              >
                <div
                  class="flex items-center cursor-pointer"
                  @click="child.type === 'file' ? selectFile(child.filePath) : null"
                >
                  <svg
                    v-if="child.type === 'folder'"
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-4 h-4 mr-1.5 text-primary"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20 5h-8.586l-2-2H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2z"></path>
                  </svg>
                  <img
                    v-else-if="getFileIconUrl(child.name)"
                    :src="getFileIconUrl(child.name)"
                    :alt="child.name"
                    class="w-4 h-4 mr-1.5"
                  />
                  <img
                    v-else
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
                    alt="文件"
                    class="w-4 h-4 mr-1.5"
                  />
                  <span :class="{'text-primary hover:underline': child.type === 'file'}">
                    {{ child.name }}
                  </span>
                </div>

                <!-- 第三级递归渲染 -->
                <ul v-if="child.children && child.children.length" class="ml-5 mt-1">
                  <li
                    v-for="subChild in child.children"
                    :key="subChild.path"
                    class="mb-1"
                  >
                    <div
                      class="flex items-center cursor-pointer"
                      @click="subChild.type === 'file' ? selectFile(subChild.filePath) : null"
                    >
                      <svg
                        v-if="subChild.type === 'folder'"
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-4 h-4 mr-1.5 text-primary"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M20 5h-8.586l-2-2H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2z"></path>
                      </svg>
                      <img
                        v-else-if="getFileIconUrl(subChild.name)"
                        :src="getFileIconUrl(subChild.name)"
                        :alt="subChild.name"
                        class="w-4 h-4 mr-1.5"
                      />
                      <img
                        v-else
                        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
                        alt="文件"
                        class="w-4 h-4 mr-1.5"
                      />
                      <span :class="{'text-primary hover:underline': subChild.type === 'file'}">
                        {{ subChild.name }}
                      </span>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
```

```{fileName:"src/components/modals/MarkdownPreviewModal.vue",filePath:"src/components/modals/MarkdownPreviewModal.vue"}
<script setup>
import { ref, computed, onMounted } from 'vue'
import { useMarkdown } from '@/composables/useMarkdown'
import { useNotificationStore } from '@/stores/notification'
import ModalWrapper from '@/components/modals/ModalWrapper.vue'

const emit = defineEmits(['close'])

const notificationStore = useNotificationStore()
const { renderMarkdown, markdownOptions, toggleMarkdownOption } = useMarkdown()

// Local state
const markdownText = ref('')
const initialContent = ref('')

// Computed properties
const parsedMarkdown = computed(() => {
  return renderMarkdown(markdownText.value)
})

// Methods
const saveMarkdownAsHTML = () => {
  try {
    // 创建完整的HTML文档
    const htmlContent = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Markdown 导出</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            line-height: 1.6;
            padding: 2rem;
            max-width: 800px;
            margin: 0 auto;
            color: #333;
        }
        h1, h2, h3, h4, h5, h6 {
            margin-top: 1.5rem;
            margin-bottom: 1rem;
            color: #2563eb;
        }
        h1 {
            font-size: 2rem;
            border-bottom: 2px solid #e5e7eb;
            padding-bottom: 0.5rem;
        }
        h2 {
            font-size: 1.8rem;
        }
        h3 {
            font-size: 1.5rem;
        }
        a {
            color: #2563eb;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
        pre {
            background-color: #f1f5f9;
            padding: 1rem;
            border-radius: 0.25rem;
            overflow-x: auto;
            font-family: monospace;
        }
        code {
            font-family: monospace;
            background-color: #f1f5f9;
            padding: 0.2rem 0.4rem;
            border-radius: 0.25rem;
            font-size: 0.9em;
        }
        pre code {
            background-color: transparent;
            padding: 0;
        }
        blockquote {
            border-left: 4px solid #6366f1;
            padding-left: 1rem;
            margin-left: 0;
            color: #4b5563;
        }
        table {
            border-collapse: collapse;
            width: 100%;
            margin-bottom: 1rem;
        }
        th, td {
            border: 1px solid #d1d5db;
            padding: 0.5rem;
        }
        th {
            background-color: #e5e7eb;
        }
        img {
            max-width: 100%;
        }
        @media (prefers-color-scheme: dark) {
            body {
                background-color: #1f2937;
                color: #f9fafb;
            }
            h1, h2, h3, h4, h5, h6 {
                color: #6366f1;
            }
            h1 {
                border-bottom: 2px solid #374151;
            }
            a {
                color: #818cf8;
            }
            pre, code {
                background-color: #111827;
            }
            blockquote {
                color: #9ca3af;
            }
            th, td {
                border: 1px solid #374151;
            }
            th {
                background-color: #1f2937;
            }
        }
    </style>
</head>
<body>
    ${parsedMarkdown.value}
</body>
</html>`;

    // 创建Blob对象
    const blob = new Blob([htmlContent], { type: 'text/html' });

    // 创建下载链接
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;

    // 设置下载文件名
    a.download = 'markdown-export.html';

    // 模拟点击下载
    document.body.appendChild(a);
    a.click();

    // 清理
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);

    notificationStore.show('success', '导出成功', 'Markdown已导出为HTML文件');
  } catch (error) {
    console.error('导出HTML失败:', error);
    notificationStore.show('error', '导出失败', error.message || '无法导出HTML文件');
  }
}

// 初始化处理
onMounted(() => {
  // 从父组件接收传入的markdown内容
  markdownText.value = initialContent.value || '# Markdown预览\n\n请提供Markdown内容进行预览。';
})
</script>

<template>
  <ModalWrapper
    title="Markdown 预览"
    @close="emit('close')"
  >
    <template #header-actions>
      <button
        @click="saveMarkdownAsHTML"
        class="btn btn-sm btn-success"
        title="保存为HTML文件"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        导出HTML
      </button>

      <div class="flex items-center space-x-2">
        <label class="text-sm text-base-content/60">自动链接</label>
        <input
          type="checkbox"
          :checked="markdownOptions.gfm"
          @change="toggleMarkdownOption('gfm')"
          class="toggle toggle-primary toggle-sm"
        />
      </div>

      <div class="flex items-center space-x-2">
        <label class="text-sm text-base-content/60">表格支持</label>
        <input
          type="checkbox"
          :checked="markdownOptions.tables"
          @change="toggleMarkdownOption('tables')"
          class="toggle toggle-primary toggle-sm"
        />
      </div>
    </template>

    <div class="p-4 max-h-[calc(90vh-120px)] overflow-y-auto custom-scrollbar">
      <div class="markdown-preview bg-base-100 dark:bg-base-200 rounded-lg p-6" v-html="parsedMarkdown"></div>

      <!-- Markdown源码预览 -->
      <details class="collapse collapse-arrow mt-4 bg-base-200 dark:bg-base-300 rounded-lg overflow-hidden">
        <summary class="collapse-title text-sm">查看Markdown源码</summary>
        <div class="collapse-content">
          <pre class="text-xs text-base-content/70 font-mono overflow-auto custom-scrollbar max-h-60">{{ markdownText }}</pre>
        </div>
      </details>
    </div>
  </ModalWrapper>
</template>
```

```{fileName:"src/components/modals/ModalWrapper.vue",filePath:"src/components/modals/ModalWrapper.vue"}
<script setup>
defineProps({
  title: {
    type: String,
    default: 'Modal'
  }
})

const emit = defineEmits(['close'])
</script>

<template>
  <div class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
    <div class="glass-effect gradient-border rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-xl animate-fadeIn">
      <div class="p-4 border-b border-base-300 flex justify-between items-center">
        <h3 class="text-xl font-medium text-primary">{{ title }}</h3>
        <div class="flex items-center space-x-3">
          <slot name="header-actions"></slot>
          <button @click="emit('close')" class="btn btn-ghost btn-sm text-base-content/60 hover:text-base-content">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <slot></slot>

      <div v-if="$slots.footer" class="p-4 border-t border-base-300">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-fadeIn {
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
```

```{fileName:"src/components/modals/TemplateManagerModal.vue",filePath:"src/components/modals/TemplateManagerModal.vue"}
<script setup>
import { ref } from 'vue'
import { useTemplateStore } from '@/stores/templates'
import { useNotificationStore } from '@/stores/notification'
import ModalWrapper from '@/components/modals/ModalWrapper.vue'

const emit = defineEmits(['close'])

const templateStore = useTemplateStore()
const notificationStore = useNotificationStore()

// Local state
const activeTemplateTab = ref('templates')
const showVariableMenu = ref(false)
const variableMenuPosition = ref({ x: 0, y: 0 })

// Tab definitions
const templateTabs = ref([
  { id: 'templates', name: '模板列表' },
  { id: 'variables', name: '变量说明' },
  { id: 'edit', name: '编辑模板' }
])

// Methods
const createNewTemplate = () => {
  templateStore.initNewTemplate()
  activeTemplateTab.value = 'edit'
}

const editTemplate = (index) => {
  templateStore.editTemplate(index)
  activeTemplateTab.value = 'edit'
}

const duplicateDefaultTemplate = (index) => {
  templateStore.duplicateDefaultTemplate(index)
  activeTemplateTab.value = 'edit'
}

const saveTemplate = () => {
  const result = templateStore.saveTemplate()

  if (result.success) {
    notificationStore.show('success', '保存成功', `模板 "${templateStore.editingTemplate.name}" 已保存`)
    activeTemplateTab.value = 'templates'
  } else {
    notificationStore.show('error', '保存失败', result.error || '无法保存模板')
  }
}

const cancelTemplateEdit = () => {
  activeTemplateTab.value = 'templates'
}

const useTemplate = (index) => {
  templateStore.useTemplate(index)
  notificationStore.show('success', '已选择模板', `当前使用模板: "${templateStore.templates[index].name}"`)
  emit('close')
}

const useDefaultTemplate = (index) => {
  templateStore.useDefaultTemplate(index)
  notificationStore.show('success', '已选择模板', `当前使用模板: "${templateStore.defaultTemplates[index].name}"`)
  emit('close')
}

const deleteTemplate = (index) => {
  if (confirm(`确定要删除模板 "${templateStore.templates[index].name}" 吗？`)) {
    templateStore.deleteTemplate(index)
    notificationStore.show('success', '删除成功', '模板已删除')
  }
}

const insertVariable = (event) => {
  const rect = event.target.getBoundingClientRect()
  variableMenuPosition.value = {
    x: rect.left,
    y: rect.bottom + 5
  }
  showVariableMenu.value = true

  // 点击其他位置关闭菜单
  setTimeout(() => {
    const closeMenu = (e) => {
      if (!e.target.closest('.variable-menu')) {
        showVariableMenu.value = false
        document.removeEventListener('click', closeMenu)
      }
    }
    document.addEventListener('click', closeMenu)
  }, 100)
}

const insertVariableToTemplate = (variableName) => {
  templateStore.insertVariable(variableName)
  showVariableMenu.value = false
}
</script>

<template>
  <ModalWrapper
    title="模板管理"
    @close="emit('close')"
  >
    <div class="p-4 max-h-[calc(90vh-120px)] overflow-y-auto custom-scrollbar">
      <div class="flex mb-4 border-b border-base-300 pb-2">
        <button
          v-for="tab in templateTabs"
          :key="tab.id"
          @click="activeTemplateTab = tab.id"
          :class="[
            'px-4 py-2 text-sm font-medium rounded-t-md mr-2 -mb-px',
            activeTemplateTab === tab.id
              ? 'bg-base-300 text-base-content border-t border-l border-r border-base-300'
              : 'text-base-content/50 hover:text-base-content/70'
          ]"
        >
          {{ tab.name }}
        </button>
      </div>

      <!-- 模板列表 -->
      <div v-if="activeTemplateTab === 'templates'" class="space-y-4">
        <div class="flex justify-between mb-4">
          <h4 class="text-lg font-medium text-base-content">我的模板</h4>
          <button @click="createNewTemplate" class="btn btn-primary btn-sm">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            新建模板
          </button>
        </div>

        <div v-if="templateStore.templates.length === 0" class="text-center py-8 text-base-content/50">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto mb-2 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p>还没有保存的模板，您可以创建一个新模板或使用默认模板</p>
        </div>

        <div v-else class="space-y-3">
          <div
            v-for="(template, index) in templateStore.templates"
            :key="index"
            class="border border-base-300 rounded-md p-3 bg-base-200 hover:bg-base-200/80"
          >
            <div class="flex justify-between items-center">
              <h5 class="font-medium text-primary">{{ template.name }}</h5>
              <div class="flex space-x-2">
                <button @click="editTemplate(index)" class="btn btn-sm btn-ghost" title="编辑">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button @click="useTemplate(index)" class="btn btn-sm btn-primary" title="使用">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </button>
                <button @click="deleteTemplate(index)" class="btn btn-sm btn-ghost hover:btn-error" title="删除">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
            <p class="text-sm text-base-content/60 mt-1 line-clamp-2">{{ template.description || '无描述' }}</p>
          </div>
        </div>

        <div class="border-t border-base-300 pt-4 mt-4">
          <h4 class="text-lg font-medium text-base-content mb-4">系统默认模板</h4>
          <div class="space-y-3">
            <div
              v-for="(template, index) in templateStore.defaultTemplates"
              :key="index"
              class="border border-base-300 rounded-md p-3 bg-base-200 hover:bg-base-200/80"
            >
              <div class="flex justify-between items-center">
                <h5 class="font-medium text-primary">{{ template.name }}</h5>
                <div class="flex space-x-2">
                  <button @click="duplicateDefaultTemplate(index)" class="btn btn-sm btn-ghost" title="复制">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                    </svg>
                  </button>
                  <button @click="useDefaultTemplate(index)" class="btn btn-sm btn-primary" title="使用">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </button>
                </div>
              </div>
              <p class="text-sm text-base-content/60 mt-1 line-clamp-2">{{ template.description || '无描述' }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 变量说明 -->
      <div v-else-if="activeTemplateTab === 'variables'" class="space-y-4">
        <p class="text-base-content mb-4">提示词模板中可以使用以下变量，它们将在生成提示词时被替换为相应的值：</p>

        <div class="bg-base-300 rounded-md p-4 space-y-4">
          <div
            v-for="(variable, index) in templateStore.templateVariables"
            :key="index"
            class="border-b border-base-200 pb-3 last:border-0 last:pb-0"
          >
            <div class="flex items-center mb-1">
              <code class="bg-base-200 px-2 py-0.5 rounded text-primary font-mono">{{ variable.name }}</code>
              <span class="ml-2 px-2 py-0.5 bg-primary/20 text-primary text-xs rounded-full">{{ variable.type }}</span>
            </div>
            <p class="text-sm text-base-content">{{ variable.description }}</p>
            <div class="mt-1 text-xs text-base-content/60 flex items-center">
              <span class="mr-1">示例值:</span>
              <code class="bg-base-200 px-1.5 py-0.5 rounded text-base-content/70 font-mono text-xs">{{ variable.example }}</code>
            </div>
          </div>
        </div>
      </div>

      <!-- 编辑模板 -->
      <div v-else-if="activeTemplateTab === 'edit'" class="space-y-4">
        <div class="space-y-2">
          <label class="block text-sm font-medium text-base-content/70">模板名称</label>
          <input
            v-model="templateStore.editingTemplate.name"
            type="text"
            class="input input-bordered w-full bg-base-200"
            placeholder="输入模板名称"
          >
        </div>

        <div class="space-y-2">
          <label class="block text-sm font-medium text-base-content/70">模板描述</label>
          <input
            v-model="templateStore.editingTemplate.description"
            type="text"
            class="input input-bordered w-full bg-base-200"
            placeholder="简短描述这个模板的用途"
          >
        </div>

        <div class="space-y-2">
          <div class="flex justify-between items-center">
            <label class="block text-sm font-medium text-base-content/70">模板内容</label>
            <div class="flex items-center text-xs text-base-content/60">
              <button
                @click="insertVariable"
                class="btn btn-sm btn-ghost"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                插入变量
              </button>
            </div>
          </div>
          <textarea
            v-model="templateStore.editingTemplate.content"
            rows="12"
            class="textarea textarea-bordered w-full bg-base-200 font-mono text-sm custom-scrollbar"
            placeholder="在此输入提示词模板内容..."
          ></textarea>

          <div class="bg-base-300 p-2 rounded-md text-xs text-base-content/60">
            <div class="flex items-center mb-1 text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2h.01a1 1 0 100-2H9z" clip-rule="evenodd" />
              </svg>
              提示
            </div>
            <p>使用 <code class="bg-base-200 px-1 rounded">${变量名}</code> 格式插入变量，例如 <code class="bg-base-200 px-1 rounded">${projectName}</code>。</p>
            <p class="mt-1">点击"插入变量"按钮快速添加可用变量。</p>
          </div>
        </div>

        <div class="flex justify-end space-x-3 pt-2">
          <button @click="cancelTemplateEdit" class="btn btn-ghost">取消</button>
          <button @click="saveTemplate" class="btn btn-primary">保存模板</button>
        </div>
      </div>
    </div>

    <!-- 变量插入菜单 -->
    <div
      v-if="showVariableMenu"
      :style="`position: fixed; top: ${variableMenuPosition.y}px; left: ${variableMenuPosition.x}px;`"
      class="variable-menu bg-base-300 rounded-lg border border-base-200 shadow-xl z-50 w-64"
    >
      <div class="p-2 text-xs text-base-content/60 border-b border-base-200">选择要插入的变量</div>
      <div class="max-h-80 overflow-y-auto custom-scrollbar">
        <button
          v-for="variable in templateStore.templateVariables"
          :key="variable.name"
          @click="insertVariableToTemplate(variable.name)"
          class="w-full text-left px-3 py-2 hover:bg-base-200 flex items-center text-sm"
        >
          <code class="bg-base-100 px-1.5 py-0.5 rounded text-primary font-mono text-xs mr-2">${{variable.name}}</code>
          <span class="text-base-content truncate">{{variable.description}}</span>
        </button>
      </div>
    </div>
  </ModalWrapper>
</template>
```

```{fileName:"src/components/modals/HistoryModal.vue",filePath:"src/components/modals/HistoryModal.vue"}
<script setup>
import { usePromptStore } from '@/stores/prompt'
import { useNotificationStore } from '@/stores/notification'
import ModalWrapper from '@/components/modals/ModalWrapper.vue'
import { useFormatter } from '@/composables/useFormatter'

const emit = defineEmits(['close'])

const promptStore = usePromptStore()
const notificationStore = useNotificationStore()
const { formatDate } = useFormatter()

// Methods
const clearHistory = () => {
  if (confirm('确定要清空所有历史记录吗？此操作不可恢复。')) {
    promptStore.clearHistory()
    notificationStore.show('success', '已清空', '历史记录已清空')
  }
}

const removeHistoryItem = (index) => {
  promptStore.removeHistoryItem(index)
  notificationStore.show('success', '已删除', '历史记录项已删除')
}

const useHistoryPrompt = (index) => {
  const historyItem = promptStore.promptHistory[index]
  promptStore.useHistoryPrompt(index)
  emit('close')
  notificationStore.show('success', '已加载', '历史提示词已加载')
}

const copyHistoryPrompt = (index) => {
  const historyItem = promptStore.promptHistory[index]

  navigator.clipboard.writeText(historyItem.prompt)
    .then(() => {
      notificationStore.show('success', '复制成功', '历史提示词已复制到剪贴板')
    })
    .catch(err => {
      notificationStore.show('error', '复制失败', err.message || '请手动选择文本并复制')
    })
}
</script>

<template>
  <ModalWrapper
    title="提示词历史记录"
    @close="emit('close')"
  >
    <div class="p-4 max-h-[calc(90vh-120px)] overflow-y-auto custom-scrollbar">
      <div v-if="promptStore.promptHistory.length === 0" class="text-center py-12 text-base-content/50">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto mb-3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p>暂无历史记录</p>
        <p class="text-sm mt-1">生成的提示词将自动保存在这里</p>
      </div>

      <div v-else class="space-y-4">
        <div class="flex justify-between items-center mb-2">
          <span class="text-sm text-base-content/60">共 {{ promptStore.promptHistory.length }} 条记录</span>
          <button
            @click="clearHistory"
            class="btn btn-sm btn-error btn-outline flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            清空历史
          </button>
        </div>

        <div
          v-for="(item, index) in promptStore.promptHistory"
          :key="index"
          class="border border-base-300 rounded-md overflow-hidden mb-4"
        >
          <div class="bg-base-300 p-3 flex justify-between items-center">
            <div>
              <div class="font-medium text-primary">{{ item.projectName || '未命名项目' }}</div>
              <div class="text-xs text-base-content/60 mt-0.5">{{ formatDate(item.timestamp) }}</div>
            </div>
            <div class="flex space-x-2">
              <button
                @click="useHistoryPrompt(index)"
                class="btn btn-primary btn-sm"
                title="使用此提示词"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </button>
              <button
                @click="copyHistoryPrompt(index)"
                class="btn btn-ghost btn-sm"
                title="复制提示词"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
                </svg>
              </button>
              <button
                @click="removeHistoryItem(index)"
                class="btn btn-ghost btn-sm hover:btn-error"
                title="删除此记录"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          <div class="p-3 bg-base-200 max-h-40 overflow-y-auto custom-scrollbar">
            <pre class="text-xs text-base-content/80 whitespace-pre-wrap break-words font-mono">{{ item.prompt.substring(0, 300) }}{{ item.prompt.length > 300 ? '...' : '' }}</pre>
          </div>
        </div>
      </div>
    </div>
  </ModalWrapper>
</template>
```

```{fileName:"src/components/modals/ParseHistoryModal.vue",filePath:"src/components/modals/ParseHistoryModal.vue"}
<script setup>
import { useFileStore } from '@/stores/files'
import { useNotificationStore } from '@/stores/notification'
import { useFileUtils } from '@/composables/useFileUtils'
import { useFormatter } from '@/composables/useFormatter'
import ModalWrapper from '@/components/modals/ModalWrapper.vue'

const emit = defineEmits(['close'])

const fileStore = useFileStore()
const notificationStore = useNotificationStore()
const { getFileIconUrl } = useFileUtils()
const { formatDate } = useFormatter()

// Methods
const clearParseHistory = () => {
  if (confirm('确定要清空所有解析历史记录吗？此操作不可恢复。')) {
    fileStore.clearParseHistory()
    notificationStore.show('success', '已清空', '解析历史记录已清空')
  }
}

const removeParseHistoryItem = (index) => {
  fileStore.removeParseHistoryItem(index)
  notificationStore.show('success', '已删除', '解析历史记录项已删除')
}

const useParseHistoryItem = (index) => {
  fileStore.useParseHistoryItem(index)
  emit('close')
  notificationStore.show('success', '已加载', `项目 "${fileStore.parseHistory[index].projectName}" 已加载`)
}

const downloadParseHistoryItem = async (index) => {
  try {
    const result = await fileStore.downloadParseHistoryItem(index)

    if (result.success) {
      notificationStore.show('success', '下载成功', `${result.fileName} 已开始下载`)
    } else {
      notificationStore.show('error', '下载失败', result.error || '无法下载文件')
    }
  } catch (error) {
    notificationStore.show('error', '下载失败', error.message)
  }
}
</script>

<template>
  <ModalWrapper
    title="项目解析历史"
    @close="emit('close')"
  >
    <div class="p-4 max-h-[calc(90vh-120px)] overflow-y-auto custom-scrollbar">
      <div v-if="fileStore.parseHistory.length === 0" class="text-center py-12 text-base-content/50">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto mb-3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p>暂无解析历史</p>
        <p class="text-sm mt-1">解析的项目将自动保存在这里</p>
      </div>

      <div v-else class="space-y-4">
        <div class="flex justify-between items-center mb-2">
          <span class="text-sm text-base-content/60">共 {{ fileStore.parseHistory.length }} 个项目</span>
          <button
            @click="clearParseHistory"
            class="btn btn-sm btn-error btn-outline flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            清空历史
          </button>
        </div>

        <div
          v-for="(item, index) in fileStore.parseHistory"
          :key="index"
          class="border border-base-300 rounded-md overflow-hidden mb-4"
        >
          <div class="bg-base-300 p-3 flex justify-between items-center">
            <div>
              <div class="font-medium text-primary">{{ item.projectName || '未命名项目' }}</div>
              <div class="text-xs text-base-content/60 mt-0.5">{{ formatDate(item.timestamp) }} · {{ item.files.length }} 个文件</div>
            </div>
            <div class="flex space-x-2">
              <button
                @click="useParseHistoryItem(index)"
                class="btn btn-primary btn-sm"
                title="使用此项目"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </button>
              <button
                @click="downloadParseHistoryItem(index)"
                class="btn btn-success btn-sm"
                title="下载项目文件"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                </svg>
              </button>
              <button
                @click="removeParseHistoryItem(index)"
                class="btn btn-ghost btn-sm hover:btn-error"
                title="删除记录"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          <div class="p-3 bg-base-200">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div class="text-xs text-base-content/60">
                <div class="font-medium text-primary mb-1">文件列表 ({{ item.files.length }})</div>
                <div class="max-h-32 overflow-y-auto custom-scrollbar">
                  <div
                    v-for="file in item.files.slice(0, 10)"
                    :key="file.filePath"
                    class="py-0.5"
                  >
                    <div class="flex items-center">
                      <img
                        v-if="getFileIconUrl(file.fileName)"
                        :src="getFileIconUrl(file.fileName)"
                        :alt="file.fileName"
                        class="h-3 w-3 mr-1"
                      />
                      <img
                        v-else
                        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
                        alt="文件"
                        class="h-3 w-3 mr-1"
                      />
                      <span class="truncate">{{ file.filePath }}</span>
                    </div>
                  </div>
                  <div v-if="item.files.length > 10" class="text-base-content/40 italic mt-1">
                    还有 {{ item.files.length - 10 }} 个文件未显示...
                  </div>
                </div>
              </div>
              <div v-if="item.parseInput" class="text-xs text-base-content/60">
                <div class="font-medium text-primary mb-1">解析内容预览</div>
                <pre class="bg-base-300 p-2 rounded-md max-h-32 overflow-y-auto custom-scrollbar text-base-content/70 whitespace-pre-wrap break-words">{{ item.parseInput.substring(0, 200) }}{{ item.parseInput.length > 200 ? '...' : '' }}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ModalWrapper>
</template>
```

```{fileName:"src/stores/theme.js",filePath:"src/stores/theme.js"}
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  // Check system preference for dark mode
  const prefersDarkScheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  const savedTheme = localStorage.getItem('theme')

  // State
  const isDarkTheme = ref(savedTheme ? savedTheme === 'dark' : prefersDarkScheme)

  // Actions
  function toggleTheme() {
    isDarkTheme.value = !isDarkTheme.value
    localStorage.setItem('theme', isDarkTheme.value ? 'dark' : 'light')
  }

  // Listen for system theme changes
  if (window.matchMedia) {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    darkModeMediaQuery.addEventListener('change', (e) => {
      // Only update if user hasn't manually set a preference
      if (!localStorage.getItem('theme')) {
        isDarkTheme.value = e.matches
      }
    })
  }

  // Watch for changes to apply the theme class
  watch(isDarkTheme, (newValue) => {
    if (newValue) {
      document.documentElement.classList.add('dark')
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.setAttribute('data-theme', 'light')
    }
  }, { immediate: true })

  return {
    isDarkTheme,
    toggleTheme
  }
})
```

```{fileName:"src/stores/notification.js",filePath:"src/stores/notification.js"}
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNotificationStore = defineStore('notification', () => {
  // State
  const notification = ref({
    show: false,
    type: 'info',
    title: '',
    message: '',
    timeout: null
  })

  // Actions
  function show(type, title, message, duration = 3000) {
    // Clear any existing timeout
    if (notification.value.timeout) {
      clearTimeout(notification.value.timeout)
    }

    // Set new notification
    notification.value = {
      show: true,
      type,
      title,
      message,
      timeout: null
    }

    // Set auto-close
    notification.value.timeout = setTimeout(() => {
      hide()
    }, duration)
  }

  function hide() {
    notification.value.show = false
  }

  return {
    notification,
    show,
    hide
  }
})
```

```{fileName:"src/stores/prompt.js",filePath:"src/stores/prompt.js"}
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useTemplateStore } from './templates'

export const usePromptStore = defineStore('prompt', () => {
  // State
  const projectInfo = ref({
    projectName: '',
    selectedTechs: [],
    projectTheme: 'dark',
    requirements: ''
  })

  const generatedPrompt = ref('')
  const promptHistory = ref([])

  // Load history from localStorage
  try {
    const savedHistory = localStorage.getItem('mini-bolt-history')
    if (savedHistory) {
      promptHistory.value = JSON.parse(savedHistory)
    }
  } catch (error) {
    console.error('Failed to load prompt history:', error)
  }

  // Actions
  function generatePrompt(info) {
    const templateStore = useTemplateStore()

    // Store project info
    projectInfo.value = { ...info }

    // Get all technologies
    const allTechs = [...info.selectedTechs]

    // Check if Next.js is included
    const hasNextJs = allTechs.includes('Next.js')

    // Generate tech stack string
    const techStackStr = allTechs.join('+')

    // Get theme description
    let themeDescription = ''
    if (info.projectTheme === 'dark') {
      themeDescription = '暗色主题模式，使界面有高级感'
    } else if (info.projectTheme === 'light') {
      themeDescription = '亮色主题模式，使界面清爽自然'
    } else if (info.projectTheme === 'both') {
      themeDescription = '同时支持暗色和亮色主题模式，并提供切换功能'
    }

    // Generate rule section based on tech stack
    const rules = {
      a: "后端代码",
      b: "前端代码",
      c: "不要mock直接使用前端调用后端",
      c1: "使用mock数据",
      d: "为了减少代码量可以抽取公共组件,函数",
      e: "如果使用了 nextjs 那么使用13版本最佳实践,正确处理use Client,不要引入不存在的东西,需要返回正确的的配置文件如next.config.js,tailwind.config.js,postcss.config.js,tsconfig.json,package.json,等，还需要处理路径引用。",
      f: "可以使用稳定版本的库保证用户可以一次运行，编写详细的readme文档",
      g: "如果有prisma需要保证代码准确性和提供seed,如果同时使用SQLite那么需要考虑到它的特性，比如，不支持枚举类型",
    }

    let rule = []
    if (hasNextJs) {
      rule = [
        rules.a,
        rules.b,
        rules.c,
        rules.d,
        rules.e,
        rules.f,
        rules.g
      ]
    } else {
      rule = [
        rules.a,
        rules.c1,
        rules.d,
        rules.f,
      ]
    }

    const ruleStr = rule.map((r, i) => `${i+1}.${r}`).join('\n')

    // Get template
    const template = templateStore.getCurrentTemplate

    // Replace variables in template
    generatedPrompt.value = templateStore.replaceTemplateVariables(template, {
      projectName: info.projectName,
      techStackStr,
      requirements: info.requirements,
      themeDescription,
      hasNextJs,
      rule: ruleStr
    })

    // Add to history
    addToHistory(info.projectName, generatedPrompt.value)

    return generatedPrompt.value
  }

  function regeneratePrompt() {
    return generatePrompt(projectInfo.value)
  }

  function addToHistory(projectName, prompt) {
    promptHistory.value.unshift({
      projectName,
      prompt,
      timestamp: Date.now()
    })

    // Limit history size to 50 items
    if (promptHistory.value.length > 50) {
      promptHistory.value = promptHistory.value.slice(0, 50)
    }

    // Save to localStorage
    try {
      localStorage.setItem('mini-bolt-history', JSON.stringify(promptHistory.value))
    } catch (error) {
      console.error('Failed to save history:', error)
    }
  }

  function clearHistory() {
    promptHistory.value = []
    localStorage.removeItem('mini-bolt-history')
  }

  function removeHistoryItem(index) {
    promptHistory.value.splice(index, 1)
    localStorage.setItem('mini-bolt-history', JSON.stringify(promptHistory.value))
  }

  function useHistoryPrompt(index) {
    generatedPrompt.value = promptHistory.value[index].prompt
  }

  return {
    projectInfo,
    generatedPrompt,
    promptHistory,
    generatePrompt,
    regeneratePrompt,
    addToHistory,
    clearHistory,
    removeHistoryItem,
    useHistoryPrompt
  }
})
```

````{fileName:"src/stores/files.js",filePath:"src/stores/files.js"}
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useNotificationStore } from './notification'
import JSZip from 'jszip'

export const useFileStore = defineStore('files', () => {
  // State
  const parseInput = ref('')
  const parsedFiles = ref([])
  const selectedFile = ref(null)
  const projectInfo = ref({ projectName: '' })
  const parseHistory = ref([])

  // Load parse history from localStorage
  try {
    const savedHistory = localStorage.getItem('mini-bolt-parse-history')
    if (savedHistory) {
      parseHistory.value = JSON.parse(savedHistory)
    }
  } catch (error) {
    console.error('Failed to load parse history:', error)
  }

  // Computed
  const fileTree = computed(() => {
    const tree = []
    const pathMap = new Map()

    parsedFiles.value.forEach(file => {
      const parts = file.filePath.split('/')
      const fileName = parts.pop() // File name is the last part

      // For each path level, ensure there's a corresponding node in the tree
      let currentPath = ''
      let currentLevel = tree

      parts.forEach(part => {
        currentPath = currentPath ? `${currentPath}/${part}` : part

        // Check if this path already exists in the tree
        let node = pathMap.get(currentPath)

        if (!node) {
          // If not, create a new node
          node = {
            name: part,
            path: currentPath,
            type: 'folder',
            children: []
          }

          // Add node to current level
          currentLevel.push(node)

          // Add node to pathMap for quick lookup
          pathMap.set(currentPath, node)
        }

        // Update current level to this node's children
        currentLevel = node.children
      })

      // File node
      currentLevel.push({
        name: fileName,
        path: file.filePath,
        type: 'file',
        filePath: file.filePath
      })
    })

    return tree
  })

  // Actions
  async function parseCode(input) {
    try {
      // Store input
      parseInput.value = input

      // Reset state
      parsedFiles.value = []
      selectedFile.value = null

      // Parse project info
      const generateInfoRegex = /```generateInfo[^`]*\n({[\s\S]*?})\n```/g
      const generateInfoMatch = generateInfoRegex.exec(input)

      if (generateInfoMatch && generateInfoMatch[1]) {
        try {
          projectInfo.value = JSON.parse(generateInfoMatch[1])
        } catch (e) {
          console.error('Failed to parse project info:', e)
          projectInfo.value = { projectName: 'Untitled Project' }
        }
      } else {
        projectInfo.value = { projectName: 'Untitled Project' }
      }

      // Parse files
      const fileRegex = /```\{fileName:"([^"]+)",filePath:"([^"]+)"\}([\s\S]*?)(?=```\{|$)/g
      let match

      while ((match = fileRegex.exec(input)) !== null) {
        const fileName = match[1]
        const filePath = match[2]

        // Remove trailing ``` if present
        let content = match[3].trim()
        if (content.endsWith('```')) {
          content = content.substring(0, content.length - 3).trim()
        }

        parsedFiles.value.push({
          fileName,
          filePath,
          content
        })
      }

      if (parsedFiles.value.length === 0) {
        return {
          success: false,
          error: '未找到符合格式的文件代码块。请确保代码按照指定格式生成。'
        }
      }

      // Save to parse history
      addToParseHistory(projectInfo.value.projectName, parsedFiles.value, input)

      return { success: true }
    } catch (error) {
      console.error('Parse error:', error)
      return { success: false, error: `解析出错: ${error.message}` }
    }
  }

  function selectFile(filePath) {
    const file = parsedFiles.value.find(f => f.filePath === filePath)
    if (file) {
      selectedFile.value = file
    }
  }

  async function downloadFiles() {
    if (parsedFiles.value.length === 0) {
      return { success: false, error: 'No files to download' }
    }

    try {
      const zip = new JSZip()
      const rootFolderName = projectInfo.value.projectName || 'project'

      // Add files to zip
      parsedFiles.value.forEach(file => {
        zip.file(`${rootFolderName}/${file.filePath}`, file.content)
      })

      // Generate zip and download
      const content = await zip.generateAsync({ type: 'blob' })

      // Create download link
      const url = URL.createObjectURL(content)
      const a = document.createElement('a')
      a.href = url
      a.download = `${rootFolderName}.zip`

      // Trigger download
      document.body.appendChild(a)
      a.click()

      // Cleanup
      setTimeout(() => {
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      }, 100)

      return { success: true, fileName: `${rootFolderName}.zip` }
    } catch (error) {
      console.error('Download error:', error)
      return { success: false, error: error.message }
    }
  }

  function addToParseHistory(projectName, files, parseInputText) {
    parseHistory.value.unshift({
      projectName: projectName || 'Untitled Project',
      files: JSON.parse(JSON.stringify(files)), // Deep copy
      parseInput: parseInputText,
      timestamp: Date.now()
    })

    // Limit history size to 20 items
    if (parseHistory.value.length > 20) {
      parseHistory.value = parseHistory.value.slice(0, 20)
    }

    // Save to localStorage
    try {
      localStorage.setItem('mini-bolt-parse-history', JSON.stringify(parseHistory.value))
    } catch (error) {
      console.error('Failed to save parse history:', error)
    }
  }

  function clearParseHistory() {
    parseHistory.value = []
    localStorage.removeItem('mini-bolt-parse-history')
  }

  function removeParseHistoryItem(index) {
    parseHistory.value.splice(index, 1)
    localStorage.setItem('mini-bolt-parse-history', JSON.stringify(parseHistory.value))
  }

  function useParseHistoryItem(index) {
    const historyItem = parseHistory.value[index]

    // Set current data
    projectInfo.value = { projectName: historyItem.projectName }
    parsedFiles.value = JSON.parse(JSON.stringify(historyItem.files)) // Deep copy
    parseInput.value = historyItem.parseInput || ''
    selectedFile.value = null
  }

  async function downloadParseHistoryItem(index) {
    const historyItem = parseHistory.value[index]
    try {
      const zip = new JSZip()
      const rootFolderName = historyItem.projectName || 'project'

      // Add files to zip
      historyItem.files.forEach(file => {
        zip.file(`${rootFolderName}/${file.filePath}`, file.content)
      })

      // Generate zip and download
      const content = await zip.generateAsync({ type: 'blob' })

      // Create download link
      const url = URL.createObjectURL(content)
      const a = document.createElement('a')
      a.href = url
      a.download = `${rootFolderName}.zip`

      // Trigger download
      document.body.appendChild(a)
      a.click()

      // Cleanup
      setTimeout(() => {
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      }, 100)

      return { success: true, fileName: `${rootFolderName}.zip` }
    } catch (error) {
      console.error('Download error:', error)
      return { success: false, error: error.message }
    }
  }

  return {
    parseInput,
    parsedFiles,
    selectedFile,
    projectInfo,
    parseHistory,
    fileTree,
    parseCode,
    selectFile,
    downloadFiles,
    addToParseHistory,
    clearParseHistory,
    removeParseHistoryItem,
    useParseHistoryItem,
    downloadParseHistoryItem
  }
})
````

```{fileName:"src/stores/templates.js",filePath:"src/stores/templates.js"}
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useTemplateStore = defineStore('templates', () => {
  // State
  const templates = ref([])
  const currentTemplateId = ref(-1)
  const currentDefaultTemplateId = ref(0)
  const editingTemplate = ref({ name: '', description: '', content: '' })
  const editingTemplateIndex = ref(-1)

  // Template variables
  const templateVariables = ref([
    {
      name: 'projectName',
      type: '文本',
      description: '项目名称',
      example: 'My Amazing Project'
    },
    {
      name: 'techStackStr',
      type: '文本',
      description: '所有选择的技术栈，以+号连接',
      example: 'Next.js+React+TypeScript+TailwindCSS'
    },
    {
      name: 'requirements',
      type: '文本',
      description: '项目需求描述',
      example: '一个博客应用，支持文章发布和评论功能'
    },
    {
      name: 'themeDescription',
      type: '文本',
      description: '主题模式描述',
      example: '暗色主题模式，使界面有高级感'
    },
    {
      name: 'hasNextJs',
      type: '布尔值',
      description: '是否包含Next.js框架',
      example: 'true 或 false'
    },
    {
      name: 'rule',
      type: '文本',
      description: '规则说明，根据技术栈自动生成',
      example: '1.后端代码\n2.使用mock数据\n3.为了减少代码量可以抽取公共组件,函数'
    }
  ])

  // Default templates
  const defaultTemplates = ref([
    {
      name: '标准模板',
      description: '默认的提示词模板，适用于大多数项目',
      content: `忽略前面的上下文
---
你是一位资深全栈工程师，使用\${techStackStr} 设计一个\${projectName}。
** 请注意不要mock直接使用实际代码编写，图片可以使用unslash **
请您模拟产品经理提出需求和信息架构，请自己构思好功能需求和界面，然后设计输出。
----
rule:
\${rule}
----
功能：\${requirements}
主题：\${themeDescription}

请按照以下格式回答输出前端工程化多文件，以便我能够自动生成相应的文件和目录结构：
* 所有内容都输出到自定义的代码块中而不是使用markdown *

## 首先，可以选择性地定义项目名称（作为顶层目录）

\`\`\`generateInfo id=generateInfo1
{
"projectName":"\${projectName}"
}
\`\`\`

## 然后，对于每个需要生成的文件，请使用以下格式：

\`\`\`{fileName:"文件名",filePath:"文件路径"}
文件内容
\`\`\`

## 格式说明

1. \`projectName\` 是可选的，如果提供，将作为顶层目录
2. \`fileName\` 是必需的，指定文件名（包括扩展名）
3. \`filePath\` 是必需的，指定文件相对路径（可以包含多级目录）
4. 文件内容直接放在花括号块的下方，直到下一个代码块开始
5. 除此之外不要输出任何内容,项目生成信息可以放入generateInfo.md文件中
6. 编写完整的readme.md文件
7. 注意转译字符

## 示例

以下是一个符合要求的回答示例：

\`\`\`generateInfo id=generateInfo0
{
"projectName":"my_project"
}
\`\`\`

\`\`\`{fileName:"app.py",filePath:"src/app.py"}
print("这是主应用文件")
\`\`\`

\`\`\`{fileName:"config.json",filePath:"config/config.json"}
{
  "name": "我的项目",
  "version": "1.0.0"
}
\`\`\`
`
    },
    {
      name: '简洁模板',
      description: '简化版提示词模板，移除了一些复杂细节',
      content: `忽略前面的上下文
---
你是一位资深前端工程师，使用\${techStackStr} 设计一个\${projectName}。

请基于以下需求完成项目：
- 功能：\${requirements}
- 主题风格：\${themeDescription}
- \${hasNextJs ? '需要完整的前后端实现' : '使用前端模拟数据，不需要实现后端'}

请按照以下格式回答输出前端工程化多文件：

\`\`\`generateInfo id=generateInfo1
{
"projectName":"\${projectName}"
}
\`\`\`

\`\`\`{fileName:"文件名",filePath:"文件路径"}
文件内容
\`\`\`

确保代码结构清晰，有详细的README.md文件说明项目用法，并正确处理各组件之间的关系。
`
    }
  ])

  // Load templates from localStorage
  try {
    const savedTemplates = localStorage.getItem('mini-bolt-templates')
    if (savedTemplates) {
      templates.value = JSON.parse(savedTemplates)
    }
  } catch (error) {
    console.error('Failed to load templates:', error)
  }

  // Computed
  const getCurrentTemplate = computed(() => {
    if (currentTemplateId.value >= 0 && currentTemplateId.value < templates.value.length) {
      return templates.value[currentTemplateId.value].content
    } else if (currentDefaultTemplateId.value >= 0 && currentDefaultTemplateId.value < defaultTemplates.value.length) {
      return defaultTemplates.value[currentDefaultTemplateId.value].content
    }
    return defaultTemplates.value[0].content
  })

  // Actions
  function saveTemplates() {
    try {
      localStorage.setItem('mini-bolt-templates', JSON.stringify(templates.value))
      return true
    } catch (error) {
      console.error('Failed to save templates:', error)
      return false
    }
  }

  function initNewTemplate() {
    editingTemplateIndex.value = -1
    editingTemplate.value = {
      name: '新模板',
      description: '',
      content: defaultTemplates.value[0].content
    }
  }

  function editTemplate(index) {
    editingTemplateIndex.value = index
    editingTemplate.value = JSON.parse(JSON.stringify(templates.value[index]))
  }

  function duplicateDefaultTemplate(index) {
    editingTemplateIndex.value = -1
    editingTemplate.value = {
      name: defaultTemplates.value[index].name + ' 副本',
      description: defaultTemplates.value[index].description,
      content: defaultTemplates.value[index].content
    }
  }

  function saveTemplate() {
    if (!editingTemplate.value.name.trim()) {
      return { success: false, error: '模板名称不能为空' }
    }

    if (!editingTemplate.value.content.trim()) {
      return { success: false, error: '模板内容不能为空' }
    }

    if (editingTemplateIndex.value >= 0) {
      // Update existing template
      templates.value[editingTemplateIndex.value] = JSON.parse(JSON.stringify(editingTemplate.value))
    } else {
      // Add new template
      templates.value.push(JSON.parse(JSON.stringify(editingTemplate.value)))
    }

    if (saveTemplates()) {
      return { success: true }
    } else {
      return { success: false, error: '无法保存模板，请检查浏览器存储设置' }
    }
  }

  function useTemplate(index) {
    currentTemplateId.value = index
    currentDefaultTemplateId.value = -1
  }

  function useDefaultTemplate(index) {
    currentDefaultTemplateId.value = index
    currentTemplateId.value = -1
  }

  function deleteTemplate(index) {
    // If deleting current template, reset
    if (currentTemplateId.value === index) {
      currentTemplateId.value = -1
      currentDefaultTemplateId.value = 0
    } else if (currentTemplateId.value > index) {
      // If deleting a template before current, adjust index
      currentTemplateId.value--
    }

    templates.value.splice(index, 1)
    saveTemplates()
  }

  function insertVariable(variableName) {
    const textarea = document.querySelector('textarea[v-model="templateStore.editingTemplate.content"]')
    if (!textarea) return

    const cursorPos = textarea.selectionStart
    const textBefore = editingTemplate.value.content.substring(0, cursorPos)
    const textAfter = editingTemplate.value.content.substring(cursorPos)

    editingTemplate.value.content = textBefore + '${' + variableName + '}' + textAfter

    // Refocus and set cursor position
    setTimeout(() => {
      textarea.focus()
      const newCursorPos = cursorPos + variableName.length + 3 // +3 for ${ and }
      textarea.setSelectionRange(newCursorPos, newCursorPos)
    }, 50)
  }

  function replaceTemplateVariables(template, variables) {
    let result = template

    for (const [key, value] of Object.entries(variables)) {
      const regex = new RegExp('\\${' + key + '}', 'g')
      result = result.replace(regex, value)
    }

    return result
  }

  return {
    templates,
    defaultTemplates,
    currentTemplateId,
    currentDefaultTemplateId,
    editingTemplate,
    editingTemplateIndex,
    templateVariables,
    getCurrentTemplate,
    saveTemplates,
    initNewTemplate,
    editTemplate,
    duplicateDefaultTemplate,
    saveTemplate,
    useTemplate,
    useDefaultTemplate,
    deleteTemplate,
    insertVariable,
    replaceTemplateVariables
  }
})
```

```{fileName:"src/stores/techStack.js",filePath:"src/stores/techStack.js"}
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTechStackStore = defineStore('techStack', () => {
  // Tech stack configuration
  const techStackConfig = {
    // 前端框架
    'Next.js': {
      category: '前端框架',
      icon: 'nextjs/nextjs-original.svg',
      description: '基于React的服务端渲染框架'
    },
    'React': {
      category: '前端框架',
      icon: 'react/react-original.svg',
      description: 'Facebook开发的用户界面库'
    },
    'Vue.js': {
      category: '前端框架',
      icon: 'vuejs/vuejs-original.svg',
      description: '渐进式JavaScript框架'
    },
    'Angular': {
      category: '前端框架',
      icon: 'angularjs/angularjs-original.svg',
      description: 'Google开发的TypeScript框架'
    },
    'Svelte': {
      category: '前端框架',
      icon: 'svelte/svelte-original.svg',
      description: '编译时前端框架'
    },

    // 语言
    'TypeScript': {
      category: '语言',
      icon: 'typescript/typescript-original.svg',
      description: 'JavaScript的超集，添加了类型系统'
    },
    'JavaScript': {
      category: '语言',
      icon: 'javascript/javascript-original.svg',
      description: '网页交互的脚本语言'
    },

    // UI框架/库
    'TailwindCSS': {
      category: 'UI框架/库',
      icon: 'tailwindcss/tailwindcss-plain.svg',
      description: '实用类优先的CSS框架'
    },
    'daisyui': {
      category: 'UI框架/库',
      icon: 'tailwindcss/tailwindcss-plain.svg', // 使用Tailwind图标
      description: 'Tailwind CSS组件库'
    },
    'shadcn': {
      category: 'UI框架/库',
      icon: 'react/react-original.svg', // 使用React图标
      description: '可重用的React组件库'
    },
    'Material-UI': {
      category: 'UI框架/库',
      icon: 'materialui/materialui-original.svg',
      description: 'Google Material设计的React组件'
    },
    'Ant Design': {
      category: 'UI框架/库',
      icon: 'react/react-original.svg', // 使用React图标
      description: '企业级UI设计语言和React组件库'
    },
    'Bootstrap': {
      category: 'UI框架/库',
      icon: 'bootstrap/bootstrap-plain.svg',
      description: '流行的CSS框架和组件库'
    },
    'Chakra UI': {
      category: 'UI框架/库',
      icon: 'react/react-original.svg', // 使用React图标
      description: '模块化和可访问的React组件库'
    },

    // 数据库
    'Prisma': {
      category: '数据库',
      icon: 'nodejs/nodejs-original.svg', // 使用Node图标
      description: '现代数据库ORM工具'
    },
    'MongoDB': {
      category: '数据库',
      icon: 'mongodb/mongodb-original.svg',
      description: '流行的NoSQL文档数据库'
    },
    'PostgreSQL': {
      category: '数据库',
      icon: 'postgresql/postgresql-original.svg',
      description: '强大的开源关系型数据库'
    },
    'SQLite': {
      category: '数据库',
      icon: 'sqlite/sqlite-original.svg',
      description: '轻量级嵌入式关系型数据库'
    },
    'MySQL': {
      category: '数据库',
      icon: 'mysql/mysql-original.svg',
      description: '最流行的开源关系型数据库'
    },
    'Supabase': {
      category: '数据库',
      icon: 'postgresql/postgresql-original.svg', // 使用PostgreSQL图标
      description: '开源的Firebase替代品'
    },
    'Firebase': {
      category: '数据库',
      icon: 'firebase/firebase-plain.svg',
      description: 'Google的应用开发平台'
    },

    // 状态管理
    'Redux': {
      category: '状态管理',
      icon: 'redux/redux-original.svg',
      description: 'JavaScript应用的状态容器'
    },
    'Zustand': {
      category: '状态管理',
      icon: 'react/react-original.svg', // 使用React图标
      description: '简单的React状态管理库'
    },
    'MobX': {
      category: '状态管理',
      icon: 'react/react-original.svg', // 使用React图标
      description: '简单、可扩展的状态管理库'
    },
    'XState': {
      category: '状态管理',
      icon: 'javascript/javascript-original.svg', // 使用JS图标
      description: 'JavaScript的状态机和状态图库'
    },
    'Recoil': {
      category: '状态管理',
      icon: 'react/react-original.svg', // 使用React图标
      description: 'Facebook的React状态管理库'
    },
    'Pinia': {
      category: '状态管理',
      icon: 'vuejs/vuejs-original.svg', // 使用Vue图标
      description: 'Vue的状态管理库'
    },

    // 请求/数据获取
    'Axios': {
      category: '请求/数据获取',
      icon: 'nodejs/nodejs-original.svg', // 使用Node图标
      description: '基于Promise的HTTP客户端'
    },
    'SWR': {
      category: '请求/数据获取',
      icon: 'react/react-original.svg', // 使用React图标
      description: 'React Hooks用于数据获取'
    },
    'React Query': {
      category: '请求/数据获取',
      icon: 'react/react-original.svg', // 使用React图标
      description: 'React数据获取和缓存库'
    },
    'Apollo': {
      category: '请求/数据获取',
      icon: 'graphql/graphql-plain.svg', // 使用GraphQL图标
      description: 'GraphQL客户端和服务器库'
    },
    'RTK Query': {
      category: '请求/数据获取',
      icon: 'redux/redux-original.svg', // 使用Redux图标
      description: 'Redux工具包的数据获取工具'
    },
    'fetch API': {
      category: '请求/数据获取',
      icon: 'javascript/javascript-original.svg', // 使用JS图标
      description: '浏览器原生HTTP请求API'
    },

    // 后端技术
    'Node.js': {
      category: '后端技术',
      icon: 'nodejs/nodejs-original.svg',
      description: 'JavaScript运行时环境'
    },
    'Express': {
      category: '后端技术',
      icon: 'express/express-original.svg',
      description: 'Node.js的Web应用框架'
    },
    'FastAPI': {
      category: '后端技术',
      icon: 'python/python-original.svg', // 使用Python图标
      description: '现代、快速的Python Web框架'
    },
    'Django': {
      category: '后端技术',
      icon: 'django/django-plain.svg',
      description: 'Python高级Web框架'
    },
    'Spring Boot': {
      category: '后端技术',
      icon: 'spring/spring-original.svg',
      description: 'Java应用开发框架'
    },
    'Laravel': {
      category: '后端技术',
      icon: 'laravel/laravel-plain.svg',
      description: 'PHP Web应用框架'
    }
  }

  // Generate categories from config
  const generateTechCategories = () => {
    const categories = {}

    // Collect all categories
    Object.entries(techStackConfig).forEach(([tech, config]) => {
      if (!categories[config.category]) {
        categories[config.category] = []
      }
      categories[config.category].push(tech)
    })

    // Convert to array format
    return Object.entries(categories).map(([category, techs]) => ({
      name: category,
      techs: techs,
      open: category === '前端框架' || category === '语言' || category === 'UI框架/库' || category === '数据库'
    }))
  }

  // State
  const techCategories = ref(generateTechCategories())

  // Actions
  function toggleCategory(index) {
    techCategories.value[index].open = !techCategories.value[index].open
  }

  function toggleAllCategories(open) {
    techCategories.value.forEach(category => {
      category.open = open
    })
  }

  function getTechIconUrl(techName) {
    if (techStackConfig[techName] && techStackConfig[techName].icon) {
      return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${techStackConfig[techName].icon}`
    }

    // Default icon
    return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg'
  }

  function getTechDescription(techName) {
    return techStackConfig[techName]?.description || ''
  }

  return {
    techCategories,
    toggleCategory,
    toggleAllCategories,
    getTechIconUrl,
    getTechDescription
  }
})
```

```{fileName:"src/composables/useFileUtils.js",filePath:"src/composables/useFileUtils.js"}
export function useFileUtils() {
  // Get language based on file extension
  const getLanguage = (fileName) => {
    if (!fileName) return 'Unknown'

    const ext = fileName.split('.').pop().toLowerCase()
    const langMap = {
      // 前端
      'js': 'JavaScript',
      'jsx': 'React JSX',
      'ts': 'TypeScript',
      'tsx': 'React TSX',
      'css': 'CSS',
      'scss': 'SCSS',
      'html': 'HTML',
      'vue': 'Vue.js',
      'svelte': 'Svelte',

      // 配置
      'json': 'JSON',
      'yml': 'YAML',
      'yaml': 'YAML',
      'toml': 'TOML',
      'xml': 'XML',
      'env': 'Env',

      // 后端
      'py': 'Python',
      'rb': 'Ruby',
      'php': 'PHP',
      'java': 'Java',
      'go': 'Go',
      'rs': 'Rust',
      'cs': 'C#',
      'scala': 'Scala',
      'swift': 'Swift',
      'kt': 'Kotlin',

      // 数据库
      'sql': 'SQL',
      'prisma': 'Prisma',

      // 文档
      'md': 'Markdown',
      'markdown': 'Markdown',
      'mdx': 'MDX',
      'txt': 'Text'
    }

    // Special file names
    if (fileName.toLowerCase() === 'dockerfile') {
      return 'Docker'
    } else if (fileName.toLowerCase().startsWith('docker-compose')) {
      return 'Docker Compose'
    } else if (fileName.toLowerCase() === '.gitignore') {
      return 'Git Ignore'
    } else if (fileName.toLowerCase() === '.env') {
      return 'Environment'
    }

    return langMap[ext] || (ext ? ext.toUpperCase() : 'Unknown')
  }

  // Check if file is markdown
  const isMarkdownFile = (fileName) => {
    const markdownExtensions = ['.md', '.markdown', '.mdown', '.mkdn', '.mkd', '.mdwn', '.mdtxt', '.mdtext']
    const lowerFileName = fileName.toLowerCase()
    return markdownExtensions.some(ext => lowerFileName.endsWith(ext))
  }

  // Get file icon URL
  const getFileIconUrl = (fileName) => {
    if (!fileName) return null

    const ext = fileName.toLowerCase().split('.').pop()

    // Tech stack mapping (using Devicon library)
    const techIcons = {
      // 前端
      'html': 'html5',
      'css': 'css3',
      'js': 'javascript',
      'jsx': 'react',
      'tsx': 'typescript',
      'ts': 'typescript',
      'vue': 'vuejs',
      'svelte': 'svelte',

      // 后端
      'py': 'python',
      'rb': 'ruby',
      'php': 'php',
      'java': 'java',
      'go': 'go',
      'rs': 'rust',
      'cs': 'csharp',
      'scala': 'scala',
      'swift': 'swift',
      'kt': 'kotlin',

      // 配置文件
      'json': 'json',
      'yml': 'yaml',
      'yaml': 'yaml',
      'xml': 'xml',
      'toml': 'coffeescript', // 使用类似的图标

      // 数据库
      'sql': 'mysql',

      // Markdown
      'md': 'markdown',
      'markdown': 'markdown',

      // 其他
      'docker': 'docker',
      'dockerfile': 'docker',
      'gitignore': 'git',
      'gitmodules': 'git',
      'npmrc': 'npm',
      'nvmrc': 'nodejs',
      'eslintrc': 'eslint',
      'prettierrc': 'javascript',
      'env': 'bash'
    }

    // Handle files with extensions
    if (fileName.includes('.')) {
      if (techIcons[ext]) {
        return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${techIcons[ext]}/${techIcons[ext]}-original.svg`
      }
    } else {
      // Handle special files without extensions
      const lowerFileName = fileName.toLowerCase()
      if (lowerFileName === 'dockerfile') {
        return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg`
      } else if (lowerFileName.startsWith('docker-compose')) {
        return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg`
      } else if (lowerFileName === '.gitignore' || lowerFileName === '.gitmodules') {
        return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg`
      } else if (lowerFileName === '.env' || lowerFileName.endsWith('.env')) {
        return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg`
      } else if (lowerFileName === 'tsconfig.json') {
        return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg`
      } else if (lowerFileName === 'package.json') {
        return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg`
      } else if (lowerFileName === 'readme.md') {
        return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/markdown/markdown-original.svg`
      } else if (lowerFileName === 'generateinfo.md') {
        return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/markdown/markdown-original.svg`
      }
    }

    // Default icon
    return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg`
  }

  return {
    getLanguage,
    isMarkdownFile,
    getFileIconUrl
  }
}
```

```{fileName:"src/composables/useMarkdown.js",filePath:"src/composables/useMarkdown.js"}
import { ref } from 'vue'
import { marked } from 'marked'

export function useMarkdown() {
  // Configure Markdown options
  const markdownOptions = ref({
    gfm: true,        // GitHub flavored markdown
    tables: true,     // Tables support
    breaks: false,    // Line breaks
    pedantic: false,  // Conform to original markdown spec
    sanitize: false,  // Sanitize HTML tags
    smartLists: true, // Smart list behavior
    smartypants: false // Smart punctuation
  })

  // Toggle Markdown option
  const toggleMarkdownOption = (option) => {
    markdownOptions.value[option] = !markdownOptions.value[option]
  }

  // Render Markdown to HTML
  const renderMarkdown = (text) => {
    try {
      // Configure marked with current options
      marked.setOptions(markdownOptions.value)
      return marked.parse(text)
    } catch (error) {
      console.error('Markdown parsing error:', error)
      return `<div class="text-error">Markdown parsing error: ${error.message}</div>`
    }
  }

  return {
    markdownOptions,
    toggleMarkdownOption,
    renderMarkdown
  }
}
```

```{fileName:"src/composables/useFormatter.js",filePath:"src/composables/useFormatter.js"}
export function useFormatter() {
  // Format date
  const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return {
    formatDate
  }
}
```

```{fileName:"favicon.ico",filePath:"public/favicon.ico"}
AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAD///8B////Af///wH///8B////Af///wH///8B////Af///wH///8B////Af///wH///8B////Af///wH///8B////Af///wH///8BKiksAyYnKAMkJSYF////Af///wElJicDKiorAyQlJgX///8B////Af///wH///8B////ASQlJQNSX24VN0Vd1RUfNc0CBRLfAAAAJQAAABkDBRTZDxct0URUb70mMDwfJicpA////wH///8B////ASQlJQNSX24VQlJrvRcgN88EBhXfAAAAGz5CPgkOEx/fDBQn1Sc2TI08S2E5JSYnA////wH///8B////Af///wH///8B////Af///wFAPkADdnBqI4JxQH+AcD+LiXc9nYpzOJ2BbD+JeGg/V0M9NwX///8B////Af///wH///8B////Af///wH///8BUEhCDYt4R5OObDD/j2wr/5BrKP+Raib/kWom/5JqJf+QbC7ngG4/bf///wH///8B////Af///wH///8B////AXdrUTuNazDzkGwq/5FrJ/+Saib/kmom/5JqJf+Taib/k2om/5JqJfuHbzzJ////Af///wH///8B////Af///wFzaFIrkmsw+ZBrKf+Raif/kmom/5JqJv+Saib/kmol/5NqJv+Taib/kmol/4duO9////8B////Af///wH///8BVUxICYV0SYeOcD//kG0v/5FrJ/+Saib/kmom/5JqJv+Saib/k2om/5NqJv+Saib/hGw64f///wH///8B////Af///wFQUWEFKS9JTxccMMsGCxnXKiI2w4VxP5+LaC7dj2om/ZJqJv+Taib/k2om/5JqJf+MbTHx////Af///wH///8B////AQYJGWcLEB3fCxAe3wsSH98JDB3fdGFSN4lrNNWPaij7kmom/5NqJv+Saib/kWsn/41tM+f///8B////Af///wH///8BBwoc0QwRHt8MEh7fDBIe3woOHdtiVk8nimwz1Y9qKPuSaib/kmom/5FrJ/+Qayz/jW40zf///wH///8B////Af///wH///8B////Af///wH///8B////Af///wFzaFIZimw13ZBrKf+SaibzjW0z1YJoOYV0YE8R////Af///wH///8B////Af///wH///8B////Af///wH///8B////Af///wFxa1MZiW045YltM9V0YVRVT0tHBf///wH///8B////Af///wH///8B////Af///wH///8B////Af///wH///8B////Af///wFqY1gRcWdTK////wH///8B////Af///wH///8B////Af///wH///8B////Af///wH///8B////Af///wH///8B////Af///wH///8B////Af///wH///8B////Af///wH///8B//8AAP//AAD//wAA+AcAAOAPAADADwAAwA8AAMAPAAMB/wAAAf8AAAH/AAAD/wAAx/8AAP//AAD//wAA//8AAA==
```

```{fileName:"src/generateInfo.md",filePath:"src/generateInfo.md"}
# Mini-Bolt.new 项目生成信息

## 项目概述

Mini-Bolt.new 是一个智能提示词引擎和项目文件解析工具，它帮助用户生成优化的AI提示词，并解析AI返回的代码，生成可下载的完整项目文件。

## 核心功能

1. **智能提示词生成器**：根据项目需求和技术栈动态生成优化的提示词
2. **代码解析引擎**：分析AI回复并提取项目文件结构
3. **模板管理系统**：保存和复用常用提示词模板
4. **历史记录跟踪**：保存生成的提示词和解析项目的历史
5. **项目导出**：将解析后的文件导出为可下载的zip包
6. **Markdown预览**：内置Markdown渲染和HTML导出功能

## 技术特性

- **现代化UI设计**：采用玻璃态设计和渐变边框等视觉效果
- **深色/浅色主题**：支持深色和浅色模式，并能根据系统偏好自动切换
- **响应式布局**：适配桌面和移动设备
- **组件化架构**：基于Vue.js 3的组件化开发
- **状态管理**：使用Pinia进行状态管理，提供可靠的数据流
- **组合式API**：采用Vue.js 3的组合式API编写逻辑，提高代码复用性

## 技术栈

- **Vue.js 3**：JavaScript前端框架
- **Pinia**：Vue.js的状态管理库
- **Vue Router**：Vue.js的官方路由管理器
- **TailwindCSS**：实用类优先的CSS框架
- **daisyUI**：基于TailwindCSS的组件库
- **JSZip**：用于生成和下载zip文件
- **marked.js**：Markdown解析器

## 用户旅程

1. 用户输入项目名称、选择技术栈并描述需求
2. 系统生成优化的AI提示词
3. 用户将提示词发送给AI助手
4. 用户将AI返回的代码粘贴回系统
5. 系统解析代码，展示文件结构
6. 用户可预览文件并下载完整项目

## 架构设计

项目采用模块化设计，主要分为以下模块：
- **配置模块**：处理用户输入的项目需求
- **提示词生成模块**：根据配置生成提示词
- **代码解析模块**：分析AI返回的代码
- **模板管理模块**：管理提示词模板
- **历史记录模块**：管理生成和解析历史
- **文件管理模块**：处理文件预览和导出

## 未来扩展方向

1. 直接集成AI API，无需手动复制粘贴提示词和回复
2. 支持更多提示词模板和技术栈配置
3. 添加项目预览功能，实时展示生成的项目效果
4. 增加协作功能，允许多人共同编辑提示词和管理模板
5. 支持更多文件格式和编程语言
```

```{fileName:"src/components/common/LoadingSpinner.vue",filePath:"src/components/common/LoadingSpinner.vue"}
<script setup>
defineProps({
  size: {
    type: String,
    default: 'md' // sm, md, lg
  },
  color: {
    type: String,
    default: 'primary' // primary, secondary, accent, neutral
  }
})
</script>

<template>
  <div
    class="loading-spinner"
    :class="{
      'w-4 h-4': size === 'sm',
      'w-8 h-8': size === 'md',
      'w-12 h-12': size === 'lg',
      'text-primary': color === 'primary',
      'text-secondary': color === 'secondary',
      'text-accent': color === 'accent',
      'text-neutral-content': color === 'neutral'
    }"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      class="animate-spin w-full h-full"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
        fill="none"
      ></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  </div>
</template>
```

```{fileName:"src/composables/useClipboard.js",filePath:"src/composables/useClipboard.js"}
import { ref } from 'vue'
import { useNotificationStore } from '@/stores/notification'

export function useClipboard() {
  const notificationStore = useNotificationStore()
  const copyingState = ref({
    isCopying: false,
    success: false
  })

  /**
   * Copy text to clipboard
   * @param {string} text - Text to copy
   * @param {string} successTitle - Title for success notification
   * @param {string} successMessage - Message for success notification
   * @param {string} errorTitle - Title for error notification
   * @returns {Promise<boolean>} Success status
   */
  const copyToClipboard = async (
    text,
    successTitle = '复制成功',
    successMessage = '内容已复制到剪贴板',
    errorTitle = '复制失败'
  ) => {
    if (!text) return false

    copyingState.value = {
      isCopying: true,
      success: false
    }

    try {
      await navigator.clipboard.writeText(text)

      copyingState.value = {
        isCopying: false,
        success: true
      }

      notificationStore.show('success', successTitle, successMessage)

      // Reset success state after 2 seconds
      setTimeout(() => {
        copyingState.value.success = false
      }, 2000)

      return true
    } catch (err) {
      copyingState.value = {
        isCopying: false,
        success: false
      }

      notificationStore.show(
        'error',
        errorTitle,
        err.message || '请手动选择文本并复制'
      )

      return false
    }
  }

  return {
    copyingState,
    copyToClipboard
  }
}
```
